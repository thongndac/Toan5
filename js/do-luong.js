/* ════════════════════════════════════════════
   DO-LUONG.JS — Đo Lường & Thời Gian
   Đơn vị đo, Thời gian, Héc-ta, Tỉ lệ bản đồ
   ════════════════════════════════════════════ */
(function () {
    const MOD = {
        render(el) {
            el.innerHTML = `
            <div class="section-header">
                <h2>📏 Đo Lường & Thời Gian</h2>
                <p>Bảng đơn vị · Số đo thời gian · Héc-ta & km² · Tỉ lệ bản đồ</p>
            </div>
            <div class="pill-group" id="dl-tabs">
                <button class="pill active" data-tab="bang">Bảng Đơn Vị</button>
                <button class="pill" data-tab="thoigian">Thời Gian</button>
                <button class="pill" data-tab="dientich">Diện Tích</button>
                <button class="pill" data-tab="tile">Tỉ Lệ Bản Đồ</button>
            </div>
            <div id="dl-content"></div>`;

            el.querySelectorAll('#dl-tabs .pill').forEach(t => t.addEventListener('click', () => {
                el.querySelectorAll('#dl-tabs .pill').forEach(x => x.classList.remove('active'));
                t.classList.add('active');
                this.showTab(t.dataset.tab);
            }));
            this.showTab('bang');
        },

        showTab(tab) {
            const c = document.getElementById('dl-content');
            if (tab === 'bang') c.innerHTML = this.tabBang();
            else if (tab === 'thoigian') c.innerHTML = this.tabThoiGian();
            else if (tab === 'dientich') c.innerHTML = this.tabDienTich();
            else if (tab === 'tile') c.innerHTML = this.tabTiLe();
            this.bind(tab);
        },

        tabBang() {
            return `
            <div class="grid-2">
                <div class="card">
                    <h3>📏 Đo Độ Dài</h3>
                    <table class="ref-table"><tr><th>Đơn vị</th><th>Quy đổi</th></tr>
                    <tr><td>1 km</td><td>= 1000 m</td></tr>
                    <tr><td>1 m</td><td>= 10 dm = 100 cm</td></tr>
                    <tr><td>1 dm</td><td>= 10 cm = 100 mm</td></tr>
                    <tr><td>1 cm</td><td>= 10 mm</td></tr>
                    </table>
                </div>
                <div class="card">
                    <h3>⚖️ Đo Khối Lượng</h3>
                    <table class="ref-table"><tr><th>Đơn vị</th><th>Quy đổi</th></tr>
                    <tr><td>1 tấn</td><td>= 1000 kg</td></tr>
                    <tr><td>1 tạ</td><td>= 100 kg</td></tr>
                    <tr><td>1 yến</td><td>= 10 kg</td></tr>
                    <tr><td>1 kg</td><td>= 1000 g</td></tr>
                    </table>
                </div>
                <div class="card">
                    <h3>📐 Đo Diện Tích</h3>
                    <table class="ref-table"><tr><th>Đơn vị</th><th>Quy đổi</th></tr>
                    <tr><td>1 km²</td><td>= 100 ha</td></tr>
                    <tr><td>1 ha</td><td>= 10 000 m²</td></tr>
                    <tr><td>1 m²</td><td>= 100 dm²</td></tr>
                    <tr><td>1 dm²</td><td>= 100 cm²</td></tr>
                    <tr><td>1 cm²</td><td>= 100 mm²</td></tr>
                    </table>
                </div>
                <div class="card">
                    <h3>🧮 Đổi đơn vị nhanh</h3>
                    <div class="input-group"><label>Giá trị</label><input class="input-field" id="dl-val" type="number" value="5.5"></div>
                    <div class="input-group"><label>Từ</label>
                        <select class="input-field" id="dl-from">
                            <option value="km">km</option><option value="m" selected>m</option><option value="dm">dm</option><option value="cm">cm</option><option value="mm">mm</option>
                        </select>
                    </div>
                    <div class="input-group"><label>Sang</label>
                        <select class="input-field" id="dl-to">
                            <option value="km">km</option><option value="m">m</option><option value="dm">dm</option><option value="cm" selected>cm</option><option value="mm">mm</option>
                        </select>
                    </div>
                    <button class="btn btn-primary btn-full" id="dl-conv">Đổi</button>
                    <div id="dl-conv-result" style="margin-top:12px"></div>
                </div>
            </div>`;
        },

        tabThoiGian() {
            return `
            <div class="grid-2">
                <div class="card formula-card">
                    <h3>📖 Đơn vị đo thời gian</h3>
                    <table class="ref-table"><tr><th>Đơn vị</th><th>Quy đổi</th></tr>
                    <tr><td>1 thế kỉ</td><td>= 100 năm</td></tr>
                    <tr><td>1 năm</td><td>= 12 tháng = 365/366 ngày</td></tr>
                    <tr><td>1 ngày</td><td>= 24 giờ</td></tr>
                    <tr><td>1 giờ</td><td>= 60 phút</td></tr>
                    <tr><td>1 phút</td><td>= 60 giây</td></tr>
                    </table>
                </div>
                <div class="card">
                    <h3>🧮 Cộng/trừ thời gian</h3>
                    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
                        <div class="input-group"><label>Giờ</label><input class="input-field" id="dl-h1" type="number" value="3"></div>
                        <div class="input-group"><label>Phút</label><input class="input-field" id="dl-m1" type="number" value="45"></div>
                        <div class="input-group"><label>Giây</label><input class="input-field" id="dl-s1" type="number" value="30"></div>
                    </div>
                    <div class="pill-group" style="justify-content:center;margin:8px 0">
                        <button class="pill active" id="dl-t-add">＋</button>
                        <button class="pill" id="dl-t-sub">－</button>
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
                        <div class="input-group"><label>Giờ</label><input class="input-field" id="dl-h2" type="number" value="1"></div>
                        <div class="input-group"><label>Phút</label><input class="input-field" id="dl-m2" type="number" value="20"></div>
                        <div class="input-group"><label>Giây</label><input class="input-field" id="dl-s2" type="number" value="45"></div>
                    </div>
                    <button class="btn btn-primary btn-full" id="dl-t-calc" style="margin-top:8px">Tính</button>
                    <div id="dl-t-result" style="margin-top:12px"></div>
                </div>
                <div class="card">
                    <h3>🧮 Nhân/Chia thời gian</h3>
                    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
                        <div class="input-group"><label>Giờ</label><input class="input-field" id="dl-mh" type="number" value="2"></div>
                        <div class="input-group"><label>Phút</label><input class="input-field" id="dl-mm" type="number" value="30"></div>
                        <div class="input-group"><label>Giây</label><input class="input-field" id="dl-ms" type="number" value="0"></div>
                    </div>
                    <div class="pill-group" style="justify-content:center;margin:8px 0">
                        <button class="pill active" id="dl-tm-mul">× (nhân)</button>
                        <button class="pill" id="dl-tm-div">÷ (chia)</button>
                    </div>
                    <div class="input-group"><label>Số</label><input class="input-field" id="dl-mn" type="number" value="3"></div>
                    <button class="btn btn-primary btn-full" id="dl-tm-calc">Tính</button>
                    <div id="dl-tm-result" style="margin-top:12px"></div>
                </div>
            </div>`;
        },

        tabDienTich() {
            return `
            <div class="grid-2">
                <div class="card formula-card">
                    <h3>📖 Héc-ta & km²</h3>
                    <div class="formula-line"><span class="highlight f-cyan">1 ha = 10 000 m²</span></div>
                    <div class="formula-line"><span class="highlight f-green">1 km² = 100 ha = 1 000 000 m²</span></div>
                </div>
                <div class="card">
                    <h3>🧮 Đổi đơn vị diện tích</h3>
                    <div class="input-group"><label>Giá trị</label><input class="input-field" id="dl-dt-val" type="number" value="2.5"></div>
                    <div class="input-group"><label>Từ</label>
                        <select class="input-field" id="dl-dt-from">
                            <option value="km2">km²</option>
                            <option value="ha" selected>ha</option>
                            <option value="m2">m²</option>
                            <option value="dm2">dm²</option>
                            <option value="cm2">cm²</option>
                        </select>
                    </div>
                    <div class="input-group"><label>Sang</label>
                        <select class="input-field" id="dl-dt-to">
                            <option value="km2">km²</option>
                            <option value="ha">ha</option>
                            <option value="m2" selected>m²</option>
                            <option value="dm2">dm²</option>
                            <option value="cm2">cm²</option>
                        </select>
                    </div>
                    <button class="btn btn-primary btn-full" id="dl-dt-calc">Đổi</button>
                    <div id="dl-dt-result" style="margin-top:12px"></div>
                </div>
            </div>`;
        },

        tabTiLe() {
            return `
            <div class="grid-2">
                <div class="card formula-card">
                    <h3>📖 Tỉ lệ bản đồ</h3>
                    <div class="formula-line"><span class="highlight f-cyan">Khoảng cách thực = Khoảng cách bản đồ × Tỉ lệ</span></div>
                    <div class="formula-line" style="font-size:.85rem;color:var(--text-secondary)">VD: Bản đồ tỉ lệ 1:100.000 → 1cm = 1km</div>
                </div>
                <div class="card">
                    <h3>🧮 Tính khoảng cách thực tế</h3>
                    <div class="input-group"><label>Khoảng cách trên bản đồ (cm)</label><input class="input-field" id="dl-bd-cm" type="number" value="5"></div>
                    <div class="input-group"><label>Tỉ lệ 1:</label><input class="input-field" id="dl-bd-tl" type="number" value="100000"></div>
                    <button class="btn btn-primary btn-full" id="dl-bd-calc">Tính</button>
                    <div id="dl-bd-result" style="margin-top:12px"></div>
                </div>
            </div>`;
        },

        bind(tab) {
            // Đổi đơn vị dài
            document.getElementById('dl-conv')?.addEventListener('click', () => {
                const val = +document.getElementById('dl-val').value;
                const from = document.getElementById('dl-from').value;
                const to = document.getElementById('dl-to').value;
                const toMm = { km: 1e6, m: 1e3, dm: 100, cm: 10, mm: 1 };
                const result = val * toMm[from] / toMm[to];
                document.getElementById('dl-conv-result').innerHTML =
                    MATH.answer(MATH.expr(MATH.val(val), MATH.txt(from), MATH.eq(), MATH.val(result.toLocaleString('vi-VN')), MATH.txt(to)));
            });

            // Thời gian + / -
            const tAdd = document.getElementById('dl-t-add');
            const tSub = document.getElementById('dl-t-sub');
            tAdd?.addEventListener('click', () => { tAdd.classList.add('active'); tSub.classList.remove('active'); });
            tSub?.addEventListener('click', () => { tSub.classList.add('active'); tAdd.classList.remove('active'); });

            document.getElementById('dl-t-calc')?.addEventListener('click', () => {
                const h1 = +document.getElementById('dl-h1').value, m1 = +document.getElementById('dl-m1').value, s1 = +document.getElementById('dl-s1').value;
                const h2 = +document.getElementById('dl-h2').value, m2 = +document.getElementById('dl-m2').value, s2 = +document.getElementById('dl-s2').value;
                const isAdd = tAdd?.classList.contains('active');
                const total1 = h1 * 3600 + m1 * 60 + s1;
                const total2 = h2 * 3600 + m2 * 60 + s2;
                const result = isAdd ? total1 + total2 : total1 - total2;
                const rh = Math.floor(Math.abs(result) / 3600);
                const rm = Math.floor((Math.abs(result) % 3600) / 60);
                const rs = Math.abs(result) % 60;
                const sign = result < 0 ? '−' : '';
                document.getElementById('dl-t-result').innerHTML = `<div class="solution-card card">
                    ${MATH.step(1, MATH.expr(MATH.val(h1 + 'g ' + m1 + 'p ' + s1 + 's'), MATH.op(isAdd ? '+' : '−'), MATH.val(h2 + 'g ' + m2 + 'p ' + s2 + 's')))}
                </div>` + MATH.answer(MATH.expr(MATH.eq(), MATH.val(sign + rh + ' giờ ' + rm + ' phút ' + rs + ' giây')));
            });

            // Nhân chia thời gian
            const tmMul = document.getElementById('dl-tm-mul');
            const tmDiv = document.getElementById('dl-tm-div');
            tmMul?.addEventListener('click', () => { tmMul.classList.add('active'); tmDiv.classList.remove('active'); });
            tmDiv?.addEventListener('click', () => { tmDiv.classList.add('active'); tmMul.classList.remove('active'); });

            document.getElementById('dl-tm-calc')?.addEventListener('click', () => {
                const h = +document.getElementById('dl-mh').value, m = +document.getElementById('dl-mm').value, s = +document.getElementById('dl-ms').value;
                const n = +document.getElementById('dl-mn').value;
                if (!n) return;
                const isMul = tmMul?.classList.contains('active');
                const totalSec = h * 3600 + m * 60 + s;
                const result = isMul ? totalSec * n : Math.round(totalSec / n);
                const rh = Math.floor(result / 3600);
                const rm = Math.floor((result % 3600) / 60);
                const rs = result % 60;
                document.getElementById('dl-tm-result').innerHTML =
                    MATH.answer(MATH.expr(MATH.val(h + 'g ' + m + 'p ' + s + 's'), MATH.op(isMul ? '×' : '÷'), MATH.val(n), MATH.eq(), MATH.val(rh + ' giờ ' + rm + ' phút ' + rs + ' giây')));
            });

            // Diện tích
            document.getElementById('dl-dt-calc')?.addEventListener('click', () => {
                const val = +document.getElementById('dl-dt-val').value;
                const from = document.getElementById('dl-dt-from').value;
                const to = document.getElementById('dl-dt-to').value;
                const toCm2 = { km2: 1e10, ha: 1e8, m2: 1e4, dm2: 100, cm2: 1 };
                const result = val * toCm2[from] / toCm2[to];
                const names = { km2: 'km²', ha: 'ha', m2: 'm²', dm2: 'dm²', cm2: 'cm²' };
                document.getElementById('dl-dt-result').innerHTML =
                    MATH.answer(MATH.expr(MATH.val(val), MATH.txt(names[from]), MATH.eq(), MATH.val(result.toLocaleString('vi-VN')), MATH.txt(names[to])));
            });

            // Tỉ lệ bản đồ
            document.getElementById('dl-bd-calc')?.addEventListener('click', () => {
                const cm = +document.getElementById('dl-bd-cm').value;
                const tl = +document.getElementById('dl-bd-tl').value;
                const resultCm = cm * tl;
                const resultKm = resultCm / 100000;
                const resultM = resultCm / 100;
                document.getElementById('dl-bd-result').innerHTML = `<div class="solution-card card">
                    ${MATH.step(1, MATH.expr(MATH.val(cm + ' cm'), MATH.op('×'), MATH.val(tl.toLocaleString('vi-VN')), MATH.eq(), MATH.val(resultCm.toLocaleString('vi-VN') + ' cm')))}
                    ${MATH.step(2, MATH.expr(MATH.eq(), MATH.val(resultM.toLocaleString('vi-VN') + ' m'), MATH.eq(), MATH.val(resultKm + ' km')))}
                </div>` + MATH.answer(MATH.expr(MATH.txt('Khoảng cách thực tế:'), MATH.val(resultKm + ' km')));
            });
        },

        destroy() { }
    };
    APP.register('do-luong', MOD);
})();
