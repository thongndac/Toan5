/* ════════════════════════════════════════════
   ON-TAP.JS — Ôn Tập & Bổ Sung
   Số tự nhiên, Phân số, Tỉ số, Bài toán
   ════════════════════════════════════════════ */
(function () {
    const MOD = {
        render(el) {
            el.innerHTML = `
            <div class="section-header">
                <h2>🔁 Ôn Tập & Bổ Sung</h2>
                <p>Số tự nhiên · Phân số · Tỉ số · Bài toán rút về đơn vị</p>
            </div>
            <div class="pill-group" id="ot-tabs">
                <button class="pill active" data-tab="so-tn">Số Tự Nhiên</button>
                <button class="pill" data-tab="phan-so">Phân Số</button>
                <button class="pill" data-tab="ti-so">Tỉ Số</button>
                <button class="pill" data-tab="bai-toan">Bài Toán</button>
            </div>
            <div id="ot-content"></div>`;

            const tabs = el.querySelectorAll('#ot-tabs .pill');
            tabs.forEach(t => t.addEventListener('click', () => {
                tabs.forEach(x => x.classList.remove('active'));
                t.classList.add('active');
                this.showTab(t.dataset.tab);
            }));
            this.showTab('so-tn');
        },

        showTab(tab) {
            const c = document.getElementById('ot-content');
            if (tab === 'so-tn') c.innerHTML = this.tabSoTN();
            else if (tab === 'phan-so') c.innerHTML = this.tabPhanSo();
            else if (tab === 'ti-so') c.innerHTML = this.tabTiSo();
            else if (tab === 'bai-toan') c.innerHTML = this.tabBaiToan();
            this.bindCalc();
        },

        tabSoTN() {
            return `
            <div class="grid-2">
                <div class="card formula-card">
                    <h3>📖 Thứ tự thực hiện phép tính</h3>
                    <div class="formula-line">1. Ngoặc <span class="f-pink">( )</span> trước</div>
                    <div class="formula-line">2. <span class="f-yellow">×</span> và <span class="f-yellow">÷</span> trước</div>
                    <div class="formula-line">3. <span class="f-blue">+</span> và <span class="f-blue">−</span> sau</div>
                    <div class="formula-line" style="margin-top:12px;font-size:.85rem;color:var(--text-secondary)">Từ trái sang phải nếu cùng mức ưu tiên</div>
                </div>
                <div class="card">
                    <h3>🧮 Máy tính biểu thức</h3>
                    <div class="input-group">
                        <label>Nhập biểu thức (VD: 12 + 3 × 4)</label>
                        <input class="input-field" id="ot-expr" placeholder="12 + 3 × 4 - 2">
                    </div>
                    <button class="btn btn-primary btn-full" id="ot-calc-expr">Tính</button>
                    <div id="ot-expr-result" style="margin-top:12px"></div>
                </div>
            </div>
            <div class="card" style="margin-top:16px">
                <h3>📝 Bảng ôn tập phép tính</h3>
                <table class="ref-table">
                    <tr><th>Phép tính</th><th>Ý nghĩa</th><th>Ví dụ</th></tr>
                    <tr><td>a + b</td><td>Tổng</td><td>125 + 375 = 500</td></tr>
                    <tr><td>a − b</td><td>Hiệu</td><td>500 − 125 = 375</td></tr>
                    <tr><td>a × b</td><td>Tích</td><td>25 × 4 = 100</td></tr>
                    <tr><td>a ÷ b</td><td>Thương</td><td>100 ÷ 4 = 25</td></tr>
                </table>
            </div>`;
        },

        tabPhanSo() {
            return `
            <div class="grid-2">
                <div class="card formula-card">
                    <h3>📖 Phân số — Công thức</h3>
                    <div class="formula-line">${MATH.expr(MATH.frac('a', 'b'), MATH.op('+'), MATH.frac('c', 'd'), MATH.eq(), MATH.frac('a×d + b×c', 'b×d'))}</div>
                    <div class="formula-line">${MATH.expr(MATH.frac('a', 'b'), MATH.op('−'), MATH.frac('c', 'd'), MATH.eq(), MATH.frac('a×d − b×c', 'b×d'))}</div>
                    <div class="formula-line">${MATH.expr(MATH.frac('a', 'b'), MATH.op('×'), MATH.frac('c', 'd'), MATH.eq(), MATH.frac('a×c', 'b×d'))}</div>
                    <div class="formula-line">${MATH.expr(MATH.frac('a', 'b'), MATH.op('÷'), MATH.frac('c', 'd'), MATH.eq(), MATH.frac('a×d', 'b×c'))}</div>
                </div>
                <div class="card">
                    <h3>🧮 Tính phân số</h3>
                    <div class="grid-2" style="grid-template-columns:1fr auto 1fr">
                        <div>
                            <div class="input-group"><label>Tử số 1</label><input class="input-field" id="ot-n1" type="number" value="2"></div>
                            <div class="input-group"><label>Mẫu số 1</label><input class="input-field" id="ot-d1" type="number" value="3"></div>
                        </div>
                        <div style="display:flex;flex-direction:column;gap:6px;padding-top:16px">
                            <button class="pill active" data-op="+" id="ot-op-plus">+</button>
                            <button class="pill" data-op="-" id="ot-op-minus">−</button>
                            <button class="pill" data-op="*" id="ot-op-mul">×</button>
                            <button class="pill" data-op="/" id="ot-op-div">÷</button>
                        </div>
                        <div>
                            <div class="input-group"><label>Tử số 2</label><input class="input-field" id="ot-n2" type="number" value="1"></div>
                            <div class="input-group"><label>Mẫu số 2</label><input class="input-field" id="ot-d2" type="number" value="4"></div>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-full" id="ot-calc-frac" style="margin-top:8px">Tính</button>
                    <div id="ot-frac-result" style="margin-top:12px"></div>
                </div>
            </div>`;
        },

        tabTiSo() {
            return `
            <div class="grid-2">
                <div class="card formula-card">
                    <h3>📖 Tỉ số</h3>
                    <div class="formula-line">Tỉ số của a và b = ${MATH.expr(MATH.frac('a', 'b'))}</div>
                    <div class="formula-line" style="margin-top:12px;font-size:.85rem;color:var(--text-secondary)">Ví dụ: Tỉ số của 3 và 5 = ${MATH.expr(MATH.frac('3', '5'))}</div>
                </div>
                <div class="card">
                    <h3>🧮 Tìm hai số biết Tổng và Tỉ</h3>
                    <div class="input-group"><label>Tổng hai số</label><input class="input-field" id="ot-tong" type="number" value="56"></div>
                    <div class="input-group"><label>Tỉ số (dạng a:b, vd 3:5)</label><input class="input-field" id="ot-ti" placeholder="3:5" value="3:5"></div>
                    <button class="btn btn-primary btn-full" id="ot-calc-ti">Tính</button>
                    <div id="ot-ti-result" style="margin-top:12px"></div>
                </div>
                <div class="card">
                    <h3>🧮 Tìm hai số biết Hiệu và Tỉ</h3>
                    <div class="input-group"><label>Hiệu hai số</label><input class="input-field" id="ot-hieu" type="number" value="24"></div>
                    <div class="input-group"><label>Tỉ số (a:b, a>b)</label><input class="input-field" id="ot-ti2" placeholder="7:3" value="7:3"></div>
                    <button class="btn btn-primary btn-full" id="ot-calc-ti2">Tìm</button>
                    <div id="ot-ti2-result" style="margin-top:12px"></div>
                </div>
            </div>`;
        },

        tabBaiToan() {
            return `
            <div class="grid-2">
                <div class="card formula-card">
                    <h3>📖 Bài toán rút về đơn vị</h3>
                    <div class="formula-line" style="text-align:left;font-size:.9rem">
                        <strong>Bước 1:</strong> Tìm giá trị 1 đơn vị<br>
                        <strong>Bước 2:</strong> Tìm giá trị cần tìm
                    </div>
                    <div class="formula-line" style="margin-top:12px;font-size:.85rem;color:var(--text-secondary)">
                        VD: 5 quyển vở giá 35.000đ. Hỏi 8 quyển giá bao nhiêu?
                    </div>
                </div>
                <div class="card">
                    <h3>🧮 Giải bài toán rút về đơn vị</h3>
                    <div class="input-group"><label>Số lượng đã biết</label><input class="input-field" id="ot-sl1" type="number" value="5"></div>
                    <div class="input-group"><label>Giá trị tổng đã biết</label><input class="input-field" id="ot-gt1" type="number" value="35000"></div>
                    <div class="input-group"><label>Số lượng cần tìm</label><input class="input-field" id="ot-sl2" type="number" value="8"></div>
                    <button class="btn btn-primary btn-full" id="ot-calc-rut">Giải</button>
                    <div id="ot-rut-result" style="margin-top:12px"></div>
                </div>
            </div>`;
        },

        bindCalc() {
            // Expression calc
            document.getElementById('ot-calc-expr')?.addEventListener('click', () => {
                const expr = document.getElementById('ot-expr').value;
                try {
                    const safe = expr.replace(/[^0-9+\-*/().× ÷]/g, '').replace(/×/g, '*').replace(/÷/g, '/');
                    const result = Function('"use strict"; return (' + safe + ')')();
                    document.getElementById('ot-expr-result').innerHTML =
                        MATH.answer(MATH.expr(MATH.txt(expr), MATH.eq(), MATH.val(result)));
                } catch (e) {
                    document.getElementById('ot-expr-result').innerHTML = '<div class="answer-box" style="border-color:var(--accent-red)">⚠️ Biểu thức không hợp lệ</div>';
                }
            });

            // Fraction calc
            const opBtns = document.querySelectorAll('[data-op]');
            let curOp = '+';
            opBtns.forEach(b => b.addEventListener('click', () => {
                opBtns.forEach(x => x.classList.remove('active'));
                b.classList.add('active');
                curOp = b.dataset.op;
            }));

            document.getElementById('ot-calc-frac')?.addEventListener('click', () => {
                const n1 = +document.getElementById('ot-n1').value, d1 = +document.getElementById('ot-d1').value;
                const n2 = +document.getElementById('ot-n2').value, d2 = +document.getElementById('ot-d2').value;
                if (!d1 || !d2) return;
                let rn, rd;
                const opSymbol = { '+': '+', '-': '−', '*': '×', '/': '÷' }[curOp];
                if (curOp === '+') { rn = n1 * d2 + n2 * d1; rd = d1 * d2; }
                else if (curOp === '-') { rn = n1 * d2 - n2 * d1; rd = d1 * d2; }
                else if (curOp === '*') { rn = n1 * n2; rd = d1 * d2; }
                else { rn = n1 * d2; rd = d1 * n2; }
                const g = MATH.gcd(Math.abs(rn), Math.abs(rd));
                const steps = [
                    MATH.step(1, MATH.expr(MATH.frac(n1, d1), MATH.op(opSymbol), MATH.frac(n2, d2))),
                    MATH.step(2, MATH.expr(MATH.eq(), MATH.frac(rn, rd))),
                    g > 1 ? MATH.step(3, MATH.expr(MATH.eq(), MATH.frac(rn / g, rd / g), MATH.txt('(rút gọn)'))) : ''
                ].join('');
                const final = g > 1 ? MATH.frac(rn / g, rd / g) : MATH.frac(rn, rd);
                document.getElementById('ot-frac-result').innerHTML = `<div class="solution-card card">${steps}</div>` + MATH.answer(final);
            });

            // Tìm hai số biết tổng và tỉ
            document.getElementById('ot-calc-ti')?.addEventListener('click', () => {
                const tong = +document.getElementById('ot-tong').value;
                const parts = document.getElementById('ot-ti').value.split(':');
                const a = +parts[0], b = +parts[1];
                if (!a && !b) return;
                const val1 = tong / (a + b) * a;
                const val2 = tong / (a + b) * b;
                document.getElementById('ot-ti-result').innerHTML = `<div class="solution-card card">
                    ${MATH.step(1, 'Tổng số phần bằng nhau: ' + MATH.expr(MATH.val(a), MATH.op('+'), MATH.val(b), MATH.eq(), MATH.val(a + b), MATH.txt('(phần)')))}
                    ${MATH.step(2, 'Giá trị 1 phần: ' + MATH.expr(MATH.val(tong), MATH.op('÷'), MATH.val(a + b), MATH.eq(), MATH.val(tong / (a + b))))}
                    ${MATH.step(3, 'Số thứ nhất: ' + MATH.expr(MATH.val(tong / (a + b)), MATH.op('×'), MATH.val(a), MATH.eq(), MATH.val(val1)))}
                    ${MATH.step(4, 'Số thứ hai: ' + MATH.expr(MATH.val(tong / (a + b)), MATH.op('×'), MATH.val(b), MATH.eq(), MATH.val(val2)))}
                </div>` + MATH.answer(MATH.expr(MATH.txt('Hai số là:'), MATH.val(val1), MATH.txt('và'), MATH.val(val2)));
            });

            // Tìm hai số biết hiệu và tỉ
            document.getElementById('ot-calc-ti2')?.addEventListener('click', () => {
                const hieu = +document.getElementById('ot-hieu').value;
                const parts = document.getElementById('ot-ti2').value.split(':');
                const a = +parts[0], b = +parts[1];
                if (a <= b) return;
                const diff = a - b;
                const val1 = hieu / diff * a;
                const val2 = hieu / diff * b;
                document.getElementById('ot-ti2-result').innerHTML = `<div class="solution-card card">
                    ${MATH.step(1, 'Hiệu số phần: ' + MATH.expr(MATH.val(a), MATH.op('−'), MATH.val(b), MATH.eq(), MATH.val(diff), MATH.txt('(phần)')))}
                    ${MATH.step(2, 'Giá trị 1 phần: ' + MATH.expr(MATH.val(hieu), MATH.op('÷'), MATH.val(diff), MATH.eq(), MATH.val(hieu / diff)))}
                    ${MATH.step(3, 'Số lớn: ' + MATH.expr(MATH.val(hieu / diff), MATH.op('×'), MATH.val(a), MATH.eq(), MATH.val(val1)))}
                    ${MATH.step(4, 'Số bé: ' + MATH.expr(MATH.val(hieu / diff), MATH.op('×'), MATH.val(b), MATH.eq(), MATH.val(val2)))}
                </div>` + MATH.answer(MATH.expr(MATH.txt('Hai số là:'), MATH.val(val1), MATH.txt('và'), MATH.val(val2)));
            });

            // Bài toán rút về đơn vị
            document.getElementById('ot-calc-rut')?.addEventListener('click', () => {
                const sl1 = +document.getElementById('ot-sl1').value;
                const gt1 = +document.getElementById('ot-gt1').value;
                const sl2 = +document.getElementById('ot-sl2').value;
                const donvi = gt1 / sl1;
                const result = donvi * sl2;
                document.getElementById('ot-rut-result').innerHTML = `<div class="solution-card card">
                    ${MATH.step(1, 'Giá trị 1 đơn vị: ' + MATH.expr(MATH.val(gt1), MATH.op('÷'), MATH.val(sl1), MATH.eq(), MATH.val(donvi)))}
                    ${MATH.step(2, 'Giá trị ' + sl2 + ' đơn vị: ' + MATH.expr(MATH.val(donvi), MATH.op('×'), MATH.val(sl2), MATH.eq(), MATH.val(result)))}
                </div>` + MATH.answer(MATH.expr(MATH.txt('Đáp số:'), MATH.val(result.toLocaleString('vi-VN'))));
            });
        },
        destroy() { }
    };
    APP.register('on-tap', MOD);
})();
