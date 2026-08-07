/**
 * Renders a clean vanilla line/area chart on a canvas element
 * @param {HTMLCanvasElement} canvasEl - The canvas target
 * @param {Array<number>} dataset - The array of numbers to plot
 * @param {Array<string>} labels - The x-axis labels (e.g., months)
 * @param {string} strokeColor - Hex color code for the dataset line
 */
export function drawLineChart(canvasEl, dataset, labels, strokeColor = '#0B2240') {
  if (!canvasEl) return;
  
  canvasEl.width = canvasEl.parentElement.offsetWidth || 500;
  const ctx = canvasEl.getContext('2d');
  
  const W = canvasEl.width;
  const H = canvasEl.height;
  const PAD = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;
  const maxVal = Math.max(...dataset);

  ctx.clearRect(0, 0, W, H);
  ctx.font = '12px Inter, sans-serif';
  ctx.fillStyle = '#94A3B8';

  //  Draw Gridlines and Y-Axis Labels
  for (let i = 0; i <= 4; i++) {
    const val = (maxVal / 4) * i;
    const y = PAD.top + chartH - (i / 4) * chartH;
    ctx.strokeStyle = '#E2E8F0';
    ctx.beginPath(); 
    ctx.moveTo(PAD.left, y); 
    ctx.lineTo(PAD.left + chartW, y); 
    ctx.stroke();
    
    // format large numbers with 'k' shorthand
    ctx.fillText(val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val, PAD.left - 42, y + 4);
  }

  // Draw X-Axis Labels
  labels.forEach((label, i) => {
    const x = PAD.left + (i / (labels.length - 1)) * chartW;
    ctx.fillText(label, x - 10, H - 10);
  });

  //  Plot the Dataset Line
  ctx.beginPath();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 3;
  dataset.forEach((val, i) => {
    const x = PAD.left + (i / (dataset.length - 1)) * chartW;
    const y = PAD.top + chartH - (val / maxVal) * chartH;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();
}