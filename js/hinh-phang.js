/* ════════════════════════════════════════════
   HINH-PHANG.JS — Hình Phẳng
   Tam giác, Hình thang, Hình tròn
   ════════════════════════════════════════════ */
(function () {
    let animId = null;

    const MOD = {
        render(el) {
            el.innerHTML = `
            <div class="section-header">
                <h2>📐 Hình Phẳng</h2>
                <p>Tam giác · Hình thang · Hình tròn — Chu vi & Diện tích</p>
            </div>
            <div class="pill-group" id="hp-tabs">
                <button class="pill active" data-tab="tamgiac">Tam Giác</button>
                <button class="pill" data-tab="hinhthang">Hình Thang</button>
                <button class="pill" data-tab="hinhtron">Hình Tròn</button>
            </div>
            <div id="hp-content"></div>`;

            el.querySelectorAll('#hp-tabs .pill').forEach(t => t.addEventListener('click', () => {
                el.querySelectorAll('#hp-tabs .pill').forEach(x => x.classList.remove('active'));
                t.classList.add('active');
                this.showTab(t.dataset.tab);
            }));
            this.showTab('tamgiac');
        },

        showTab(tab) {
            if (animId) { cancelAnimationFrame(animId); animId = null; }
            const c = document.getElementById('hp-content');
            if (tab === 'tamgiac') c.innerHTML = this.tabTamGiac();
            else if (tab === 'hinhthang') c.innerHTML = this.tabHinhThang();
            else if (tab === 'hinhtron') c.innerHTML = this.tabHinhTron();
            this.bind(tab);
        },

        tabTamGiac() {
            return `
            <div class="grid-sidebar">
                <div class="flex-col">
                    <div class="card formula-card">
                        <h3>📖 Công thức Tam giác</h3>
                        <div class="formula-line"><span class="highlight f-cyan">S = a × h ÷ 2</span></div>
                        <div class="formula-line" style="font-size:.85rem;color:var(--text-secondary)">a = đáy, h = chiều cao tương ứng</div>
                    </div>
                    <div class="card">
                        <h3>🧮 Tính diện tích</h3>
                        <div class="input-group"><label>Đáy a (cm)</label><input class="input-field" id="hp-tg-a" type="number" value="8"></div>
                        <div class="input-group"><label>Chiều cao h (cm)</label><input class="input-field" id="hp-tg-h" type="number" value="5"></div>
                        <button class="btn btn-primary btn-full" id="hp-tg-calc">Tính diện tích</button>
                        <div id="hp-tg-result" style="margin-top:12px"></div>
                    </div>
                </div>
                <div class="card" style="display:flex;align-items:center;justify-content:center">
                    <canvas id="hp-tg-canvas" width="300" height="280"></canvas>
                </div>
            </div>`;
        },

        tabHinhThang() {
            return `
            <div class="grid-sidebar">
                <div class="flex-col">
                    <div class="card formula-card">
                        <h3>📖 Công thức Hình thang</h3>
                        <div class="formula-line"><span class="highlight f-cyan">S = (a + b) × h ÷ 2</span></div>
                        <div class="formula-line" style="font-size:.85rem;color:var(--text-secondary)">a = đáy lớn, b = đáy bé, h = chiều cao</div>
                    </div>
                    <div class="card">
                        <h3>🧮 Tính diện tích</h3>
                        <div class="input-group"><label>Đáy lớn a (cm)</label><input class="input-field" id="hp-ht-a" type="number" value="10"></div>
                        <div class="input-group"><label>Đáy bé b (cm)</label><input class="input-field" id="hp-ht-b" type="number" value="6"></div>
                        <div class="input-group"><label>Chiều cao h (cm)</label><input class="input-field" id="hp-ht-h" type="number" value="4"></div>
                        <button class="btn btn-primary btn-full" id="hp-ht-calc">Tính diện tích</button>
                        <div id="hp-ht-result" style="margin-top:12px"></div>
                    </div>
                </div>
                <div class="card" style="display:flex;align-items:center;justify-content:center">
                    <canvas id="hp-ht-canvas" width="300" height="280"></canvas>
                </div>
            </div>`;
        },

        tabHinhTron() {
            return `
            <div class="grid-sidebar">
                <div class="flex-col">
                    <div class="card formula-card">
                        <h3>📖 Công thức Hình tròn</h3>
                        <div class="formula-line"><span class="highlight f-green">C = d × π</span> (chu vi)</div>
                        <div class="formula-line"><span class="highlight f-cyan">S = r × r × π</span> (diện tích)</div>
                        <div class="formula-line" style="font-size:.85rem;color:var(--text-secondary)">π ≈ 3,14 · d = đường kính · r = bán kính</div>
                    </div>
                    <div class="card">
                        <h3>🧮 Tính chu vi & diện tích</h3>
                        <div class="input-group"><label>Bán kính r (cm)</label><input class="input-field" id="hp-ht-r" type="number" value="7"></div>
                        <button class="btn btn-primary btn-full" id="hp-ht-calc-circle">Tính</button>
                        <div id="hp-circle-result" style="margin-top:12px"></div>
                    </div>
                </div>
                <div class="card" style="display:flex;align-items:center;justify-content:center">
                    <canvas id="hp-circle-canvas" width="300" height="280"></canvas>
                </div>
            </div>`;
        },

        drawTriangle(a, h) {
            const cv = document.getElementById('hp-tg-canvas');
            if (!cv) return;
            const ctx = cv.getContext('2d');
            ctx.clearRect(0, 0, cv.width, cv.height);
            const mx = cv.width / 2, pad = 40;
            const scale = Math.min((cv.width - pad * 2) / a, (cv.height - pad * 2) / h);
            const w = a * scale, ht = h * scale;
            const x0 = mx - w / 2, y0 = cv.height - pad;

            ctx.fillStyle = 'rgba(34,211,238,0.15)';
            ctx.strokeStyle = '#22d3ee';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.lineTo(x0 + w, y0);
            ctx.lineTo(mx, y0 - ht);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Labels
            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 14px Nunito';
            ctx.textAlign = 'center';
            ctx.fillText(`a = ${a}`, mx, y0 + 20);
            ctx.fillStyle = '#f472b6';
            ctx.fillText(`h = ${h}`, mx + w / 2 + 20, y0 - ht / 2);

            // Dashed height
            ctx.setLineDash([4, 4]);
            ctx.strokeStyle = '#f472b6';
            ctx.beginPath();
            ctx.moveTo(mx, y0);
            ctx.lineTo(mx, y0 - ht);
            ctx.stroke();
            ctx.setLineDash([]);
        },

        drawTrapezoid(a, b, h) {
            const cv = document.getElementById('hp-ht-canvas');
            if (!cv) return;
            const ctx = cv.getContext('2d');
            ctx.clearRect(0, 0, cv.width, cv.height);
            const mx = cv.width / 2, pad = 40;
            const scale = Math.min((cv.width - pad * 2) / a, (cv.height - pad * 2) / h);
            const wa = a * scale, wb = b * scale, ht = h * scale;
            const y0 = cv.height - pad;

            ctx.fillStyle = 'rgba(167,139,250,0.15)';
            ctx.strokeStyle = '#a78bfa';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(mx - wa / 2, y0);
            ctx.lineTo(mx + wa / 2, y0);
            ctx.lineTo(mx + wb / 2, y0 - ht);
            ctx.lineTo(mx - wb / 2, y0 - ht);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 14px Nunito';
            ctx.textAlign = 'center';
            ctx.fillText(`a = ${a}`, mx, y0 + 20);
            ctx.fillText(`b = ${b}`, mx, y0 - ht - 10);
            ctx.fillStyle = '#f472b6';
            ctx.fillText(`h = ${h}`, mx + wa / 2 + 24, y0 - ht / 2);
        },

        drawCircle(r) {
            const cv = document.getElementById('hp-circle-canvas');
            if (!cv) return;
            const ctx = cv.getContext('2d');
            ctx.clearRect(0, 0, cv.width, cv.height);
            const mx = cv.width / 2, my = cv.height / 2;
            const scale = Math.min((cv.width - 80) / (r * 2), (cv.height - 80) / (r * 2));
            const sr = r * scale;

            ctx.fillStyle = 'rgba(52,211,153,0.12)';
            ctx.strokeStyle = '#34d399';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(mx, my, sr, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Radius line
            ctx.strokeStyle = '#fbbf24';
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(mx, my);
            ctx.lineTo(mx + sr, my);
            ctx.stroke();
            ctx.setLineDash([]);

            // Center dot
            ctx.fillStyle = '#f472b6';
            ctx.beginPath();
            ctx.arc(mx, my, 4, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#fbbf24';
            ctx.font = 'bold 14px Nunito';
            ctx.textAlign = 'center';
            ctx.fillText(`r = ${r}`, mx + sr / 2, my - 10);
        },

        bind(tab) {
            if (tab === 'tamgiac') {
                const calc = () => {
                    const a = +document.getElementById('hp-tg-a').value;
                    const h = +document.getElementById('hp-tg-h').value;
                    if (!a || !h) return;
                    const s = a * h / 2;
                    this.drawTriangle(a, h);
                    document.getElementById('hp-tg-result').innerHTML = `<div class="solution-card card">
                        ${MATH.step(1, MATH.expr(MATH.lbl('S'), MATH.eq(), MATH.val(a), MATH.op('×'), MATH.val(h), MATH.op('÷'), MATH.val(2)))}
                        ${MATH.step(2, MATH.expr(MATH.lbl('S'), MATH.eq(), MATH.val(a * h), MATH.op('÷'), MATH.val(2)))}
                    </div>` + MATH.answer(MATH.expr(MATH.lbl('S'), MATH.eq(), MATH.val(s), MATH.unit('cm²')));
                };
                document.getElementById('hp-tg-calc').addEventListener('click', calc);
                this.drawTriangle(8, 5);
            } else if (tab === 'hinhthang') {
                const calc = () => {
                    const a = +document.getElementById('hp-ht-a').value;
                    const b = +document.getElementById('hp-ht-b').value;
                    const h = +document.getElementById('hp-ht-h').value;
                    if (!a || !b || !h) return;
                    const s = (a + b) * h / 2;
                    this.drawTrapezoid(a, b, h);
                    document.getElementById('hp-ht-result').innerHTML = `<div class="solution-card card">
                        ${MATH.step(1, MATH.expr(MATH.lbl('S'), MATH.eq(), MATH.txt('('), MATH.val(a), MATH.op('+'), MATH.val(b), MATH.txt(')'), MATH.op('×'), MATH.val(h), MATH.op('÷'), MATH.val(2)))}
                        ${MATH.step(2, MATH.expr(MATH.lbl('S'), MATH.eq(), MATH.val(a + b), MATH.op('×'), MATH.val(h), MATH.op('÷'), MATH.val(2)))}
                    </div>` + MATH.answer(MATH.expr(MATH.lbl('S'), MATH.eq(), MATH.val(s), MATH.unit('cm²')));
                };
                document.getElementById('hp-ht-calc').addEventListener('click', calc);
                this.drawTrapezoid(10, 6, 4);
            } else if (tab === 'hinhtron') {
                const calc = () => {
                    const r = +document.getElementById('hp-ht-r').value;
                    if (!r) return;
                    const d = r * 2;
                    const C = Math.round(d * 3.14 * 100) / 100;
                    const S = Math.round(r * r * 3.14 * 100) / 100;
                    this.drawCircle(r);
                    document.getElementById('hp-circle-result').innerHTML = `<div class="solution-card card">
                        ${MATH.step(1, MATH.expr(MATH.lbl('d'), MATH.eq(), MATH.val(r), MATH.op('×'), MATH.val(2), MATH.eq(), MATH.val(d), MATH.unit('cm')))}
                        ${MATH.step(2, MATH.expr(MATH.lbl('C'), MATH.eq(), MATH.val(d), MATH.op('×'), MATH.val('3,14'), MATH.eq(), MATH.val(C), MATH.unit('cm')))}
                        ${MATH.step(3, MATH.expr(MATH.lbl('S'), MATH.eq(), MATH.val(r), MATH.op('×'), MATH.val(r), MATH.op('×'), MATH.val('3,14'), MATH.eq(), MATH.val(S), MATH.unit('cm²')))}
                    </div>` + MATH.answer(MATH.expr(MATH.txt('C ='), MATH.val(C + ' cm'), MATH.txt(' · S ='), MATH.val(S + ' cm²')));
                };
                document.getElementById('hp-ht-calc-circle').addEventListener('click', calc);
                this.drawCircle(7);
            }
        },

        destroy() { if (animId) { cancelAnimationFrame(animId); animId = null; } }
    };
    APP.register('hinh-phang', MOD);
})();
