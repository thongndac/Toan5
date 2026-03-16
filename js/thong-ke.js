/* ════════════════════════════════════════════
   THONG-KE.JS — Thống Kê & Xác Suất
   Biểu đồ cột, Biểu đồ quạt, Xác suất
   ════════════════════════════════════════════ */
(function () {
    const MOD = {
        render(el) {
            el.innerHTML = `
            <div class="section-header">
                <h2>📊 Thống Kê & Xác Suất</h2>
                <p>Biểu đồ cột · Biểu đồ quạt tròn · Xác suất cơ bản</p>
            </div>
            <div class="pill-group" id="tk-tabs">
                <button class="pill active" data-tab="cot">Biểu Đồ Cột</button>
                <button class="pill" data-tab="quat">Biểu Đồ Quạt</button>
                <button class="pill" data-tab="xacsu">Xác Suất</button>
            </div>
            <div id="tk-content"></div>`;

            el.querySelectorAll('#tk-tabs .pill').forEach(t => t.addEventListener('click', () => {
                el.querySelectorAll('#tk-tabs .pill').forEach(x => x.classList.remove('active'));
                t.classList.add('active');
                this.showTab(t.dataset.tab);
            }));
            this.showTab('cot');
        },

        showTab(tab) {
            const c = document.getElementById('tk-content');
            if (tab === 'cot') c.innerHTML = this.tabCot();
            else if (tab === 'quat') c.innerHTML = this.tabQuat();
            else if (tab === 'xacsu') c.innerHTML = this.tabXacSuat();
            this.bind(tab);
        },

        tabCot() {
            return `
            <div class="grid-sidebar">
                <div class="card">
                    <h3>📊 Tạo biểu đồ cột</h3>
                    <div class="input-group"><label>Tiêu đề biểu đồ</label>
                        <input class="input-field" id="tk-bar-title" value="Số học sinh giỏi mỗi lớp">
                    </div>
                    <div class="input-group"><label>Dữ liệu (tên:giá trị mỗi dòng)</label>
                        <textarea class="input-field" id="tk-bar-data" rows="6" style="resize:vertical">5A:12
5B:15
5C:10
5D:18
5E:14</textarea>
                    </div>
                    <button class="btn btn-primary btn-full" id="tk-bar-draw">Vẽ biểu đồ</button>
                </div>
                <div class="card" style="display:flex;align-items:center;justify-content:center;flex-direction:column">
                    <canvas id="tk-bar-canvas" width="400" height="320"></canvas>
                </div>
            </div>`;
        },

        tabQuat() {
            return `
            <div class="grid-sidebar">
                <div class="card">
                    <h3>📊 Tạo biểu đồ quạt tròn</h3>
                    <div class="input-group"><label>Tiêu đề</label>
                        <input class="input-field" id="tk-pie-title" value="Cơ cấu điểm kiểm tra">
                    </div>
                    <div class="input-group"><label>Dữ liệu (tên:giá trị mỗi dòng)</label>
                        <textarea class="input-field" id="tk-pie-data" rows="5" style="resize:vertical">Giỏi:8
Khá:12
Trung bình:15
Yếu:5</textarea>
                    </div>
                    <button class="btn btn-primary btn-full" id="tk-pie-draw">Vẽ biểu đồ</button>
                </div>
                <div class="card" style="display:flex;align-items:center;justify-content:center;flex-direction:column">
                    <canvas id="tk-pie-canvas" width="340" height="340"></canvas>
                    <div id="tk-pie-legend" style="margin-top:12px;font-size:.85rem"></div>
                </div>
            </div>`;
        },

        tabXacSuat() {
            return `
            <div class="grid-2">
                <div class="card formula-card">
                    <h3>📖 Xác suất là gì?</h3>
                    <div class="formula-line"><span class="highlight f-cyan">P = Số kết quả thuận lợi ÷ Tổng số kết quả</span></div>
                    <div class="formula-line" style="font-size:.85rem;color:var(--text-secondary)">
                        Xác suất luôn nằm trong khoảng từ 0 đến 1 (hoặc 0% đến 100%)
                    </div>
                </div>
                <div class="card">
                    <h3>🎲 Mô phỏng tung xúc xắc</h3>
                    <p style="font-size:.85rem;color:var(--text-secondary);margin-bottom:10px">
                        Click "Tung" để tung xúc xắc. Theo thống kê dài hạn, mỗi mặt xuất hiện khoảng ${MATH.frac('1', '6')} = 16.7%
                    </p>
                    <button class="btn btn-blue btn-full" id="tk-dice-roll">🎲 Tung xúc xắc</button>
                    <div id="tk-dice-result" style="margin-top:12px;text-align:center;font-size:3rem"></div>
                    <div id="tk-dice-stats" style="margin-top:12px"></div>
                    <button class="btn btn-secondary btn-full" id="tk-dice-100" style="margin-top:8px">Tung 100 lần</button>
                </div>
                <div class="card">
                    <h3>🪙 Mô phỏng tung đồng xu</h3>
                    <p style="font-size:.85rem;color:var(--text-secondary);margin-bottom:10px">
                        Xác suất: P(Sấp) = P(Ngửa) = ${MATH.frac('1', '2')} = 50%
                    </p>
                    <button class="btn btn-purple btn-full" id="tk-coin-flip">🪙 Tung đồng xu</button>
                    <div id="tk-coin-result" style="margin-top:12px;text-align:center;font-size:2rem"></div>
                    <div id="tk-coin-stats" style="margin-top:12px"></div>
                    <button class="btn btn-secondary btn-full" id="tk-coin-100" style="margin-top:8px">Tung 100 lần</button>
                </div>
                <div class="card">
                    <h3>🧮 Tính xác suất</h3>
                    <div class="input-group"><label>Số kết quả thuận lợi</label><input class="input-field" id="tk-p-fav" type="number" value="3"></div>
                    <div class="input-group"><label>Tổng số kết quả</label><input class="input-field" id="tk-p-total" type="number" value="10"></div>
                    <button class="btn btn-primary btn-full" id="tk-p-calc">Tính P</button>
                    <div id="tk-p-result" style="margin-top:12px"></div>
                </div>
            </div>`;
        },

        drawBarChart(title, data) {
            const cv = document.getElementById('tk-bar-canvas');
            if (!cv) return;
            const ctx = cv.getContext('2d');
            ctx.clearRect(0, 0, cv.width, cv.height);

            const pad = { top: 40, right: 20, bottom: 50, left: 50 };
            const w = cv.width - pad.left - pad.right;
            const h = cv.height - pad.top - pad.bottom;
            const maxVal = Math.max(...data.map(d => d.val));
            const barW = w / data.length * 0.6;
            const gap = w / data.length * 0.4;
            const colors = ['#60a5fa', '#34d399', '#fbbf24', '#f472b6', '#a78bfa', '#22d3ee', '#fb923c', '#f87171'];

            // Title
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px Nunito';
            ctx.textAlign = 'center';
            ctx.fillText(title, cv.width / 2, 22);

            // Y axis
            ctx.strokeStyle = 'rgba(255,255,255,0.15)';
            ctx.lineWidth = 1;
            for (let i = 0; i <= 5; i++) {
                const y = pad.top + h - (h * i / 5);
                ctx.beginPath();
                ctx.moveTo(pad.left, y);
                ctx.lineTo(pad.left + w, y);
                ctx.stroke();
                ctx.fillStyle = '#94a3b8';
                ctx.font = '11px Nunito';
                ctx.textAlign = 'right';
                ctx.fillText(Math.round(maxVal * i / 5), pad.left - 8, y + 4);
            }

            // Bars
            data.forEach((d, i) => {
                const x = pad.left + (barW + gap) * i + gap / 2;
                const barH = (d.val / maxVal) * h;
                const y = pad.top + h - barH;

                const gradient = ctx.createLinearGradient(x, y, x, pad.top + h);
                gradient.addColorStop(0, colors[i % colors.length]);
                gradient.addColorStop(1, colors[i % colors.length] + '44');
                ctx.fillStyle = gradient;

                ctx.beginPath();
                ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
                ctx.fill();

                // Value on top
                ctx.fillStyle = '#f1f5f9';
                ctx.font = 'bold 12px Nunito';
                ctx.textAlign = 'center';
                ctx.fillText(d.val, x + barW / 2, y - 6);

                // Label below
                ctx.fillStyle = '#94a3b8';
                ctx.font = '11px Nunito';
                ctx.fillText(d.name, x + barW / 2, pad.top + h + 18);
            });
        },

        drawPieChart(title, data) {
            const cv = document.getElementById('tk-pie-canvas');
            if (!cv) return;
            const ctx = cv.getContext('2d');
            ctx.clearRect(0, 0, cv.width, cv.height);
            const cx = cv.width / 2, cy = cv.height / 2 + 10, r = 130;
            const total = data.reduce((s, d) => s + d.val, 0);
            const colors = ['#60a5fa', '#34d399', '#fbbf24', '#f472b6', '#a78bfa', '#22d3ee', '#fb923c', '#f87171'];
            let angle = -Math.PI / 2;

            // Title
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 14px Nunito';
            ctx.textAlign = 'center';
            ctx.fillText(title, cx, 16);

            data.forEach((d, i) => {
                const sliceAngle = (d.val / total) * Math.PI * 2;
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.arc(cx, cy, r, angle, angle + sliceAngle);
                ctx.closePath();
                ctx.fillStyle = colors[i % colors.length];
                ctx.fill();
                ctx.strokeStyle = 'rgba(15,12,41,0.8)';
                ctx.lineWidth = 2;
                ctx.stroke();

                const mid = angle + sliceAngle / 2;
                const pct = Math.round(d.val / total * 100);
                if (pct >= 5) {
                    ctx.fillStyle = '#fff';
                    ctx.font = 'bold 13px Nunito';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(pct + '%', cx + Math.cos(mid) * r * 0.65, cy + Math.sin(mid) * r * 0.65);
                }
                angle += sliceAngle;
            });

            const leg = document.getElementById('tk-pie-legend');
            if (leg) {
                leg.innerHTML = data.map((d, i) =>
                    `<span style="display:inline-flex;align-items:center;gap:4px;margin:4px 10px">
                        <span style="width:12px;height:12px;border-radius:3px;background:${colors[i % colors.length]}"></span>
                        ${d.name}: ${d.val}
                    </span>`
                ).join('');
            }
        },

        bind(tab) {
            if (tab === 'cot') {
                document.getElementById('tk-bar-draw')?.addEventListener('click', () => {
                    const title = document.getElementById('tk-bar-title').value;
                    const raw = document.getElementById('tk-bar-data').value.trim();
                    const data = raw.split('\n').map(l => {
                        const [name, val] = l.split(':');
                        return { name: name?.trim(), val: +(val?.trim()) };
                    }).filter(d => d.name && d.val > 0);
                    if (data.length) this.drawBarChart(title, data);
                });
                setTimeout(() => document.getElementById('tk-bar-draw')?.click(), 100);
            }

            if (tab === 'quat') {
                document.getElementById('tk-pie-draw')?.addEventListener('click', () => {
                    const title = document.getElementById('tk-pie-title').value;
                    const raw = document.getElementById('tk-pie-data').value.trim();
                    const data = raw.split('\n').map(l => {
                        const [name, val] = l.split(':');
                        return { name: name?.trim(), val: +(val?.trim()) };
                    }).filter(d => d.name && d.val > 0);
                    if (data.length) this.drawPieChart(title, data);
                });
                setTimeout(() => document.getElementById('tk-pie-draw')?.click(), 100);
            }

            if (tab === 'xacsu') {
                // Dice
                const diceHist = [0, 0, 0, 0, 0, 0];
                let diceTotal = 0;
                const diceEmoji = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

                const rollOne = () => {
                    const val = Math.floor(Math.random() * 6) + 1;
                    diceHist[val - 1]++;
                    diceTotal++;
                    return val;
                };

                const showDiceStats = () => {
                    document.getElementById('tk-dice-stats').innerHTML = `
                        <table class="ref-table"><tr><th>Mặt</th>${diceHist.map((_, i) => `<th>${i + 1}</th>`).join('')}</tr>
                        <tr><td>Lần</td>${diceHist.map(h => `<td>${h}</td>`).join('')}</tr>
                        <tr><td>%</td>${diceHist.map(h => `<td>${diceTotal ? Math.round(h / diceTotal * 100) : 0}%</td>`).join('')}</tr>
                        </table><p style="font-size:.8rem;color:var(--text-muted);margin-top:4px">Tổng: ${diceTotal} lần tung</p>`;
                };

                document.getElementById('tk-dice-roll')?.addEventListener('click', () => {
                    const val = rollOne();
                    document.getElementById('tk-dice-result').textContent = diceEmoji[val];
                    showDiceStats();
                });

                document.getElementById('tk-dice-100')?.addEventListener('click', () => {
                    let last;
                    for (let i = 0; i < 100; i++) last = rollOne();
                    document.getElementById('tk-dice-result').textContent = diceEmoji[last];
                    showDiceStats();
                });

                // Coin
                let heads = 0, tails = 0;
                const showCoinStats = () => {
                    const total = heads + tails;
                    document.getElementById('tk-coin-stats').innerHTML = `
                        <table class="ref-table"><tr><th></th><th>Sấp (S)</th><th>Ngửa (N)</th></tr>
                        <tr><td>Lần</td><td>${heads}</td><td>${tails}</td></tr>
                        <tr><td>%</td><td>${total ? Math.round(heads / total * 100) : 0}%</td><td>${total ? Math.round(tails / total * 100) : 0}%</td></tr>
                        </table><p style="font-size:.8rem;color:var(--text-muted);margin-top:4px">Tổng: ${total} lần tung</p>`;
                };

                document.getElementById('tk-coin-flip')?.addEventListener('click', () => {
                    if (Math.random() < 0.5) { heads++; document.getElementById('tk-coin-result').textContent = '🌝 Sấp'; }
                    else { tails++; document.getElementById('tk-coin-result').textContent = '🌚 Ngửa'; }
                    showCoinStats();
                });

                document.getElementById('tk-coin-100')?.addEventListener('click', () => {
                    for (let i = 0; i < 100; i++) {
                        if (Math.random() < 0.5) heads++;
                        else tails++;
                    }
                    document.getElementById('tk-coin-result').textContent = '🎲 ×100 xong!';
                    showCoinStats();
                });

                // Probability calc
                document.getElementById('tk-p-calc')?.addEventListener('click', () => {
                    const fav = +document.getElementById('tk-p-fav').value;
                    const total = +document.getElementById('tk-p-total').value;
                    if (!total) return;
                    const g = MATH.gcd(fav, total);
                    const pct = Math.round(fav / total * 10000) / 100;
                    document.getElementById('tk-p-result').innerHTML = `<div class="solution-card card">
                        ${MATH.step(1, MATH.expr(MATH.lbl('P'), MATH.eq(), MATH.frac(fav, total), g > 1 ? MATH.expr(MATH.eq(), MATH.frac(fav / g, total / g)) : ''))}
                        ${MATH.step(2, MATH.expr(MATH.lbl('P'), MATH.eq(), MATH.val(pct + '%')))}
                    </div>` + MATH.answer(MATH.expr(MATH.txt('Xác suất ='), MATH.val(pct + '%')));
                });
            }
        },

        destroy() { }
    };
    APP.register('thong-ke', MOD);
})();
