const apiUrl = (window.LEADERBOARD_API_URL || 'https://rta-leaderboard-api.bvszp558ds.workers.dev').replace(/\/$/, '');
const scoreList = document.getElementById('scores');
const message = document.getElementById('message');
const refreshButton = document.getElementById('refresh');
const bestTime = document.getElementById('best-time');
const updatedAt = document.getElementById('updated-at');

function formatTime(milliseconds) {
  const value = Math.max(0, Number(milliseconds) || 0);
  const minutes = Math.floor(value / 60000);
  const seconds = Math.floor((value % 60000) / 1000);
  const centiseconds = Math.floor((value % 1000) / 10);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centiseconds).padStart(2, '0')}`;
}

function renderScores(entries) {
  const sorted = entries
    .filter((entry) => Number.isFinite(Number(entry.clear_time)))
    .sort((left, right) => Number(left.clear_time) - Number(right.clear_time))
    .slice(0, 100);
  scoreList.replaceChildren();
  bestTime.textContent = sorted.length ? formatTime(sorted[0].clear_time) : '--:--:--';

  if (!sorted.length) {
    message.textContent = 'まだ記録がありません。';
    message.dataset.state = 'empty';
    return;
  }

  message.textContent = '';
  message.dataset.state = '';
  sorted.forEach((entry, index) => {
    const pending = entry.status === 'pending';
    const item = document.createElement('li');
    item.className = `score-row${pending ? ' score-row--pending' : ''}`;
    item.style.setProperty('--row-index', String(index));

    const rank = document.createElement('span');
    rank.className = 'score-rank';
    rank.textContent = String(index + 1).padStart(2, '0');

    const player = document.createElement('span');
    player.className = 'score-player';
    player.textContent = pending ? '審査中...' : (entry.nickname || 'anonymous');

    const time = document.createElement('time');
    time.className = 'score-time';
    time.textContent = formatTime(entry.clear_time);

    item.append(rank, player, time);
    if (pending) {
      const points = document.createElement('span');
      points.className = 'score-points';
      points.textContent = `${Number(entry.score) || 0} pt`;
      item.append(points);
    }
    scoreList.append(item);
  });
}

async function loadScores() {
  refreshButton.disabled = true;
  message.dataset.state = '';
  message.textContent = '読み込み中...';
  try {
    const response = await fetch(`${apiUrl}/scores`, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    renderScores(Array.isArray(payload.scores) ? payload.scores : []);
    updatedAt.textContent = `最終更新 ${new Intl.DateTimeFormat('ja-JP', { hour: '2-digit', minute: '2-digit' }).format(new Date())}`;
  } catch {
    scoreList.replaceChildren();
    bestTime.textContent = '--:--:--';
    message.textContent = 'ランキングを読み込めませんでした。時間をおいて再度お試しください。';
    message.dataset.state = 'error';
    updatedAt.textContent = '';
  } finally {
    refreshButton.disabled = false;
  }
}

refreshButton.addEventListener('click', loadScores);
loadScores();