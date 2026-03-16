/* ════════════════════════════════════════════
   PHAN-TRAM.JS — Tỉ Số Phần Trăm
   Phần trăm, Biểu đồ quạt tròn
   ════════════════════════════════════════════ */
(function () {
    const MOD = {
        render(el) {
            el.innerHTML = `
            <div class="section-header">
                <h2>💯 Tỉ Số Phần Trăm</h2>
                <p>Khái niệm · Tính tỉ số % · Tìm giá trị % · Biểu đồ quạt</p>
            </div>
            <div class="pill-group" id="pt-tabs">
                <button class="pill active" data-tab="khai-niem">Khái Niệm</button>
                <button class="pill" data-tab="tinh-pctram">Tính %</button>
                <button class="pill" data-tab="tim-gtri">Tìm Giá Trị</button>
                <button class="pill" data-tab="bieu-do">Biểu Đồ Quạt</button>
                <button class="pill" data-tab="may-tinh">Máy Tính %</button>
            </div>
            <div id="pt-content"></div>`;

            el.querySelectorAll('#pt-tabs .pill').forEach(t => t.addEventListener('click', () => {
                el.querySelectorAll('#pt-tabs .pill').forEach(x => x.classList.remove('active'));
                t.classList.add('active');
                this.showTab(t.dataset.tab);
            }));
            this.showTab('khai-niem');
        },

        showTab(tab) {
            const c = document.getElementById('pt-content');
            const methods = {
                'khai-niem': this.tabKhaiNiem,
                'tinh-pctram': this.tabTinhPC,
                'tim-gtri': this.tabTimGT,
                'bieu-do': this.tabBieuDo,
                'may-tinh': this.tabMayTinh
            };
            c.innerHTML = methods[tab].call(this);
            this.bind(tab);
        },

        tabKhaiNiem() {
            return `
            <div class="grid-2">
                <div class="card formula-card">
                    <h3>📖 Phần trăm là gì?</h3>
                    <div class="formula-line">${MATH.expr(MATH.frac('a', '100'), MATH.eq(), MATH.val('a%'))}</div>
                    <div class="formula-line" style="margin-top:12px;font-size:.88rem;color:var(--text-secondary)">
                        Phần trăm là tỉ số của một số so với 100
                    </div>
                    <div class="formula-line" style="font-size:.88rem">
                        VD: ${MATH.expr(MATH.frac('25', '100'), MATH.eq(), MATH.val('25%'))}
                    </div>
                </div>
                <div class="card formula-card">
                    <h3>📖 Chuyển đổi</h3>
                    <div class="formula-line" style="font-size:.9rem">
                        <span class="f-cyan">Phân số → %:</span> Chia tử cho mẫu, nhân 100
                    </div>
                    <div class="formula-line" style="font-size:.9rem">
                        VD: ${MATH.expr(MATH.frac('3', '4'), MATH.eq(), MATH.val('3 ÷ 4 × 100'), MATH.eq(), MATH.val('75%'))}
                    </div>
                    <div class="formula-line" style="font-size:.9rem;margin-top:8px">
                        <span class="f-green">STP → %:</span> Nhân với 100
                    </div>
                    <div class="formula-line" style="font-size:.9rem">
                        VD: ${MATH.expr(MATH.val('0,75'), MATH.op('×'), MATH.val('100'), MATH.eq(), MATH.val('75%'))}
                    </div>
                </div>
            </div>
            <div class="card" style="margin-top:16px">
                <h3>🧮 Chuyển phân số → phần trăm</h3>
                <div class="grid-2" style="grid-template-columns:1fr 1fr auto">
                    <div class="input-group"><label>Tử số</label><input class="input-field" id="pt-conv-n" type="number" value="3"></div>
                    <div class="input-group"><label>Mẫu số</label><input class="input-field" id="pt-conv-d" type="number" value="5"></div>
                    <button class="btn btn-primary" id="pt-conv-calc" style="margin-top:20px">→ %</button>
                </div>
                <div id="pt-conv-result" style="margin-top:8px"></div>
            </div>`;
        },

        tabTinhPC() {
            return `
            <div class="grid-2">
                <div class="card formula-card">
                    <h3>📖 Tính tỉ số phần trăm</h3>
                    <div class="formula-line"><span class="highlight f-cyan">% = (a ÷ b) × 100</span></div>
                    <div class="formula-line" style="font-size:.85rem;color:var(--text-secondary)">Tìm a chiếm bao nhiêu % của b</div>
                </div>
                <div class="card">
                    <h3>🧮 Tính tỉ số %</h3>
                    <div class="input-group"><label>Số cần tìm % (a)</label><input class="input-field" id="pt-a" type="number" value="45"></div>
                    <div class="input-group"><label>Số tổng (b)</label><input class="input-field" id="pt-b" type="number" value="180"></div>
                    <button class="btn btn-primary btn-full" id="pt-calc-pc">Tính %</button>
                    <div id="pt-pc-result" style="margin-top:12px"></div>
                </div>
            </div>`;
        },

        tabTimGT() {
            return `
            <div class="grid-2">
                <div class="card formula-card">
                    <h3>📖 Tìm giá trị phần trăm</h3>
                    <div class="formula-line"><span class="highlight f-green">Giá trị = Số × (% ÷ 100)</span></div>
                    <div class="formula-line" style="font-size:.85rem;color:var(--text-secondary)">Tìm X% của Y bằng bao nhiêu?</div>
                </div>
                <div class="card">
                    <h3>🧮 Tìm X% của Y</h3>
                    <div class="input-group"><label>Phần trăm X (%)</label><input class="input-field" id="pt-x" type="number" value="25"></div>
                    <div class="input-group"><label>Số Y</label><input class="input-field" id="pt-y" type="number" value="200"></div>
                    <button class="btn btn-primary btn-full" id="pt-calc-gt">Tìm</button>
                    <div id="pt-gt-result" style="margin-top:12px"></div>
                </div>
            </div>`;
        },

        tabBieuDo() {
            return `
            <div class="grid-sidebar">
                <div class="card">
                    <h3>📊 Tạo biểu đồ quạt tròn</h3>
                    <div class="input-group"><label>Nhập dữ liệu (tên:giá trị mỗi dòng)</label>
                        <textarea class="input-field" id="pt-pie-data" rows="5" style="resize:vertical">Toán:35
Văn:25
Anh:20
Khoa học:15
Khác:5</textarea>
                    </div>
                    <button class="btn btn-primary btn-full" id="pt-pie-draw">Vẽ biểu đồ</button>
                </div>
                <div class="card" style="display:flex;align-items:center;justify-content:center;flex-direction:column">
                    <canvas id="pt-pie-canvas" width="320" height="320"></canvas>
                    <div id="pt-pie-legend" style="margin-top:12px;font-size:.85rem"></div>
                </div>
            </div>`;
        },

        tabMayTinh() {
            return `
            <div class="grid-2">
                <div class="card">
                    <h3>🧮 Máy tính phần trăm đa năng</h3>
                    <div class="pill-group" id="pt-mc-mode">
                        <button class="pill active" data-m="ab">A là bao nhiêu % của B?</button>
                        <button class="pill" data-m="xb">X% của B = ?</button>
                        <button class="pill" data-m="tang">Tăng/giảm %</button>
                    </div>
                    <div id="pt-mc-inputs"></div>
                    <button class="btn btn-primary btn-full" id="pt-mc-calc" style="margin-top:8px">Tính</button>
                    <div id="pt-mc-result" style="margin-top:12px"></div>
                </div>
                <div class="card formula-card">
                    <h3>📖 Bảng phần trăm thường gặp</h3>
                    <table class="ref-table">
                        <tr><th>Phân số</th><th>Phần trăm</th><th>Số TP</th></tr>
                        <tr><td>${MATH.frac('1', '2')}</td><td>50%</td><td>0,5</td></tr>
                        <tr><td>${MATH.frac('1', '4')}</td><td>25%</td><td>0,25</td></tr>
                        <tr><td>${MATH.frac('3', '4')}</td><td>75%</td><td>0,75</td></tr>
                        <tr><td>${MATH.frac('1', '5')}</td><td>20%</td><td>0,2</td></tr>
                        <tr><td>${MATH.frac('1', '10')}</td><td>10%</td><td>0,1</td></tr>
                        <tr><td>${MATH.frac('1', '3')}</td><td>33,3%</td><td>0,333…</td></tr>
                    </table>
                </div>
            </div>`;
        },

        drawPie(data) {
            const cv = document.getElementById('pt-pie-canvas');
            if (!cv) return;
            const ctx = cv.getContext('2d');
            const cx = cv.width / 2, cy = cv.height / 2, r = 130;
            ctx.clearRect(0, 0, cv.width, cv.height);
            const total = data.reduce((s, d) => s + d.val, 0);
            const colors = ['#60a5fa', '#34d399', '#fbbf24', '#f472b6', '#a78bfa', '#22d3ee', '#fb923c', '#f87171'];
            let angle = -Math.PI / 2;

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

                // Label
                const mid = angle + sliceAngle / 2;
                const pct = Math.round(d.val / total * 100);
                const lx = cx + Math.cos(mid) * (r * 0.65);
                const ly = cy + Math.sin(mid) * (r * 0.65);
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 13px Nunito';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                if (pct >= 5) ctx.fillText(pct + '%', lx, ly);

                angle += sliceAngle;
            });

            // Legend
            const leg = document.getElementById('pt-pie-legend');
            if (leg) {
                leg.innerHTML = data.map((d, i) =>
                    `<span style="display:inline-flex;align-items:center;gap:4px;margin:4px 10px">
                        <span style="width:12px;height:12px;border-radius:3px;background:${colors[i % colors.length]}"></span>
                        ${d.name}: ${d.val} (${Math.round(d.val / total * 100)}%)
                    </span>`
                ).join('');
            }
        },

        bind(tab) {
            // Chuyển phân số sang %
            document.getElementById('pt-conv-calc')?.addEventListener('click', () => {
                const n = +document.getElementById('pt-conv-n').value;
                const d = +document.getElementById('pt-conv-d').value;
                if (!d) return;
                const pct = Math.round(n / d * 10000) / 100;
                document.getElementById('pt-conv-result').innerHTML = `<div class="solution-card card">
                    ${MATH.step(1, MATH.expr(MATH.frac(n, d), MATH.eq(), MATH.val(n), MATH.op('÷'), MATH.val(d), MATH.eq(), MATH.val(n / d)))}
                    ${MATH.step(2, MATH.expr(MATH.val(n / d), MATH.op('×'), MATH.val(100), MATH.eq(), MATH.val(pct + '%')))}
                </div>` + MATH.answer(MATH.expr(MATH.frac(n, d), MATH.eq(), MATH.val(pct + '%')));
            });

            // Tính tỉ số %
            document.getElementById('pt-calc-pc')?.addEventListener('click', () => {
                const a = +document.getElementById('pt-a').value;
                const b = +document.getElementById('pt-b').value;
                if (!b) return;
                const pct = Math.round(a / b * 10000) / 100;
                document.getElementById('pt-pc-result').innerHTML = `<div class="solution-card card">
                    ${MATH.step(1, MATH.expr(MATH.val(a), MATH.op('÷'), MATH.val(b), MATH.eq(), MATH.val(Math.round(a / b * 10000) / 10000)))}
                    ${MATH.step(2, MATH.expr(MATH.val(Math.round(a / b * 10000) / 10000), MATH.op('×'), MATH.val(100), MATH.eq(), MATH.val(pct + '%')))}
                </div>` + MATH.answer(MATH.expr(MATH.val(a), MATH.txt('chiếm'), MATH.val(pct + '%'), MATH.txt('của'), MATH.val(b)));
            });

            // Tìm giá trị %
            document.getElementById('pt-calc-gt')?.addEventListener('click', () => {
                const x = +document.getElementById('pt-x').value;
                const y = +document.getElementById('pt-y').value;
                const result = y * x / 100;
                document.getElementById('pt-gt-result').innerHTML = `<div class="solution-card card">
                    ${MATH.step(1, MATH.expr(MATH.val(y), MATH.op('×'), MATH.frac(x, 100)))}
                    ${MATH.step(2, MATH.expr(MATH.eq(), MATH.val(y), MATH.op('×'), MATH.val(x / 100)))}
                </div>` + MATH.answer(MATH.expr(MATH.val(x + '%'), MATH.txt('của'), MATH.val(y), MATH.eq(), MATH.val(result)));
            });

            // Biểu đồ quạt
            document.getElementById('pt-pie-draw')?.addEventListener('click', () => {
                const raw = document.getElementById('pt-pie-data').value.trim();
                const data = raw.split('\n').map(l => {
                    const [name, val] = l.split(':');
                    return { name: name.trim(), val: +val };
                }).filter(d => d.name && d.val > 0);
                if (data.length) this.drawPie(data);
            });
            // Auto-draw
            setTimeout(() => {
                const btn = document.getElementById('pt-pie-draw');
                if (btn) btn.click();
            }, 100);

            // Máy tính %
            const mcModes = document.querySelectorAll('#pt-mc-mode .pill');
            const mcInputs = document.getElementById('pt-mc-inputs');
            let curMode = 'ab';

            const showInputs = (m) => {
                curMode = m;
                if (m === 'ab') {
                    mcInputs.innerHTML = `
                        <div class="input-group"><label>Số A</label><input class="input-field" id="pt-mc-a" type="number" value="45"></div>
                        <div class="input-group"><label>Số B</label><input class="input-field" id="pt-mc-b" type="number" value="180"></div>`;
                } else if (m === 'xb') {
                    mcInputs.innerHTML = `
                        <div class="input-group"><label>X (%)</label><input class="input-field" id="pt-mc-x" type="number" value="25"></div>
                        <div class="input-group"><label>Số B</label><input class="input-field" id="pt-mc-b2" type="number" value="200"></div>`;
                } else {
                    mcInputs.innerHTML = `
                        <div class="input-group"><label>Số ban đầu</label><input class="input-field" id="pt-mc-orig" type="number" value="500"></div>
                        <div class="input-group"><label>Phần trăm thay đổi</label><input class="input-field" id="pt-mc-pct" type="number" value="15"></div>
                        <div class="pill-group" style="margin-top:8px">
                            <button class="pill active" id="pt-mc-tang">Tăng</button>
                            <button class="pill" id="pt-mc-giam">Giảm</button>
                        </div>`;
                }
            };

            mcModes?.forEach(m => m.addEventListener('click', () => {
                mcModes.forEach(x => x.classList.remove('active'));
                m.classList.add('active');
                showInputs(m.dataset.m);
            }));
            if (mcInputs) showInputs('ab');

            document.getElementById('pt-mc-calc')?.addEventListener('click', () => {
                const res = document.getElementById('pt-mc-result');
                if (curMode === 'ab') {
                    const a = +document.getElementById('pt-mc-a')?.value;
                    const b = +document.getElementById('pt-mc-b')?.value;
                    if (!b) return;
                    res.innerHTML = MATH.answer(MATH.expr(MATH.val(a), MATH.txt('là'), MATH.val(Math.round(a / b * 10000) / 100 + '%'), MATH.txt('của'), MATH.val(b)));
                } else if (curMode === 'xb') {
                    const x = +document.getElementById('pt-mc-x')?.value;
                    const b = +document.getElementById('pt-mc-b2')?.value;
                    res.innerHTML = MATH.answer(MATH.expr(MATH.val(x + '%'), MATH.txt('của'), MATH.val(b), MATH.eq(), MATH.val(b * x / 100)));
                } else {
                    const orig = +document.getElementById('pt-mc-orig')?.value;
                    const pct = +document.getElementById('pt-mc-pct')?.value;
                    const isTang = document.getElementById('pt-mc-tang')?.classList.contains('active');
                    const result = isTang ? orig * (1 + pct / 100) : orig * (1 - pct / 100);
                    res.innerHTML = MATH.answer(MATH.expr(MATH.val(orig), MATH.txt(isTang ? 'tăng' : 'giảm'), MATH.val(pct + '%'), MATH.eq(), MATH.val(Math.round(result * 100) / 100)));
                }
            });

            // Tăng/giảm toggle
            document.getElementById('pt-mc-tang')?.addEventListener('click', function () {
                this.classList.add('active');
                document.getElementById('pt-mc-giam').classList.remove('active');
            });
            document.getElementById('pt-mc-giam')?.addEventListener('click', function () {
                this.classList.add('active');
                document.getElementById('pt-mc-tang').classList.remove('active');
            });
        },

        destroy() { }
    };
    APP.register('phan-tram', MOD);
})();
