/* ════════════════════════════════════════════
   HINH-KHOI.JS — Hình Khối 3D
   Hình hộp CN, Hình lập phương, Hình trụ
   ════════════════════════════════════════════ */
(function () {
    let scene, camera, renderer, controls, meshRef, animId;

    function cleanup3D() {
        if (animId) cancelAnimationFrame(animId);
        if (renderer) renderer.dispose();
        scene = camera = renderer = controls = meshRef = null;
        animId = null;
    }

    function init3D(containerId, w, h) {
        cleanup3D();
        const container = document.getElementById(containerId);
        if (!container) return;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
        camera.position.set(4, 3, 5);

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(w, h);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 2;

        // Lighting
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));
        const dl = new THREE.DirectionalLight(0xffffff, 0.8);
        dl.position.set(5, 8, 5);
        scene.add(dl);

        // Grid
        const grid = new THREE.GridHelper(8, 8, 0x333366, 0x222244);
        grid.position.y = -0.01;
        scene.add(grid);

        const animate = () => {
            animId = requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();
    }

    function addBox(a, b, c) {
        if (!scene) return;
        if (meshRef) scene.remove(meshRef);
        const geo = new THREE.BoxGeometry(a, c, b);
        const mat = new THREE.MeshPhongMaterial({
            color: 0x60a5fa, transparent: true, opacity: 0.6,
            side: THREE.DoubleSide
        });
        meshRef = new THREE.Mesh(geo, mat);
        meshRef.position.y = c / 2;
        scene.add(meshRef);

        const edges = new THREE.EdgesGeometry(geo);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x22d3ee }));
        line.position.copy(meshRef.position);
        meshRef.add(line);
    }

    function addCylinder(r, h) {
        if (!scene) return;
        if (meshRef) scene.remove(meshRef);
        const geo = new THREE.CylinderGeometry(r, r, h, 32);
        const mat = new THREE.MeshPhongMaterial({
            color: 0x34d399, transparent: true, opacity: 0.6,
            side: THREE.DoubleSide
        });
        meshRef = new THREE.Mesh(geo, mat);
        meshRef.position.y = h / 2;
        scene.add(meshRef);

        const edges = new THREE.EdgesGeometry(geo);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xa78bfa }));
        meshRef.add(line);
    }

    const MOD = {
        render(el) {
            el.innerHTML = `
            <div class="section-header">
                <h2>🧊 Hình Khối 3D</h2>
                <p>Hình hộp chữ nhật · Hình lập phương · Hình trụ — DT & Thể tích</p>
            </div>
            <div class="pill-group" id="hk-tabs">
                <button class="pill active" data-tab="hop">Hình Hộp CN</button>
                <button class="pill" data-tab="lp">Hình Lập Phương</button>
                <button class="pill" data-tab="tru">Hình Trụ</button>
                <button class="pill" data-tab="donvi">Đơn Vị Thể Tích</button>
            </div>
            <div id="hk-content"></div>`;

            el.querySelectorAll('#hk-tabs .pill').forEach(t => t.addEventListener('click', () => {
                el.querySelectorAll('#hk-tabs .pill').forEach(x => x.classList.remove('active'));
                t.classList.add('active');
                this.showTab(t.dataset.tab);
            }));
            this.showTab('hop');
        },

        showTab(tab) {
            cleanup3D();
            const c = document.getElementById('hk-content');
            if (tab === 'hop') c.innerHTML = this.tabHop();
            else if (tab === 'lp') c.innerHTML = this.tabLP();
            else if (tab === 'tru') c.innerHTML = this.tabTru();
            else if (tab === 'donvi') { c.innerHTML = this.tabDonVi(); this.bindDonVi(); return; }
            setTimeout(() => this.bind3D(tab), 50);
        },

        tabHop() {
            return `
            <div class="grid-sidebar">
                <div class="flex-col">
                    <div class="card formula-card">
                        <h3>📖 Hình hộp chữ nhật</h3>
                        <div class="formula-line"><span class="highlight f-cyan">S<sub>xq</sub> = (a + b) × 2 × c</span></div>
                        <div class="formula-line"><span class="highlight f-green">S<sub>tp</sub> = S<sub>xq</sub> + 2 × a × b</span></div>
                        <div class="formula-line"><span class="highlight f-yellow">V = a × b × c</span></div>
                    </div>
                    <div class="card">
                        <h3>🧮 Tính</h3>
                        <div class="input-group"><label>Chiều dài a (cm)</label><input class="input-field" id="hk-a" type="number" value="5"></div>
                        <div class="input-group"><label>Chiều rộng b (cm)</label><input class="input-field" id="hk-b" type="number" value="3"></div>
                        <div class="input-group"><label>Chiều cao c (cm)</label><input class="input-field" id="hk-c" type="number" value="4"></div>
                        <button class="btn btn-primary btn-full" id="hk-calc">Tính</button>
                        <div id="hk-result" style="margin-top:12px"></div>
                    </div>
                </div>
                <div class="card"><div id="hk-3d" style="width:100%;aspect-ratio:1"></div></div>
            </div>`;
        },

        tabLP() {
            return `
            <div class="grid-sidebar">
                <div class="flex-col">
                    <div class="card formula-card">
                        <h3>📖 Hình lập phương</h3>
                        <div class="formula-line"><span class="highlight f-cyan">S<sub>xq</sub> = a × a × 4</span></div>
                        <div class="formula-line"><span class="highlight f-green">S<sub>tp</sub> = a × a × 6</span></div>
                        <div class="formula-line"><span class="highlight f-yellow">V = a × a × a</span></div>
                    </div>
                    <div class="card">
                        <h3>🧮 Tính</h3>
                        <div class="input-group"><label>Cạnh a (cm)</label><input class="input-field" id="hk-lp-a" type="number" value="4"></div>
                        <button class="btn btn-primary btn-full" id="hk-lp-calc">Tính</button>
                        <div id="hk-lp-result" style="margin-top:12px"></div>
                    </div>
                </div>
                <div class="card"><div id="hk-3d" style="width:100%;aspect-ratio:1"></div></div>
            </div>`;
        },

        tabTru() {
            return `
            <div class="grid-sidebar">
                <div class="flex-col">
                    <div class="card formula-card">
                        <h3>📖 Hình trụ</h3>
                        <div class="formula-line"><span class="highlight f-cyan">S<sub>xq</sub> = 2 × π × r × h</span></div>
                        <div class="formula-line"><span class="highlight f-green">S<sub>tp</sub> = S<sub>xq</sub> + 2 × π × r²</span></div>
                        <div class="formula-line"><span class="highlight f-yellow">V = π × r² × h</span></div>
                    </div>
                    <div class="card">
                        <h3>🧮 Tính</h3>
                        <div class="input-group"><label>Bán kính r (cm)</label><input class="input-field" id="hk-tru-r" type="number" value="3"></div>
                        <div class="input-group"><label>Chiều cao h (cm)</label><input class="input-field" id="hk-tru-h" type="number" value="7"></div>
                        <button class="btn btn-primary btn-full" id="hk-tru-calc">Tính</button>
                        <div id="hk-tru-result" style="margin-top:12px"></div>
                    </div>
                </div>
                <div class="card"><div id="hk-3d" style="width:100%;aspect-ratio:1"></div></div>
            </div>`;
        },

        tabDonVi() {
            return `
            <div class="grid-2">
                <div class="card formula-card">
                    <h3>📖 Đơn vị thể tích</h3>
                    <table class="ref-table">
                        <tr><th>Đơn vị</th><th>Quy đổi</th></tr>
                        <tr><td>1 m³</td><td>= 1000 dm³</td></tr>
                        <tr><td>1 dm³</td><td>= 1000 cm³ = 1 lít</td></tr>
                        <tr><td>1 cm³</td><td>= 1 ml</td></tr>
                        <tr><td>1 m³</td><td>= 1 000 000 cm³</td></tr>
                    </table>
                    <div class="formula-line" style="margin-top:12px;font-size:.85rem;color:var(--text-secondary)">
                        Mỗi bậc gấp/giảm 1000 lần
                    </div>
                </div>
                <div class="card">
                    <h3>🧮 Đổi đơn vị thể tích</h3>
                    <div class="input-group"><label>Giá trị</label><input class="input-field" id="hk-dv-val" type="number" value="5"></div>
                    <div class="input-group"><label>Từ đơn vị</label>
                        <select class="input-field" id="hk-dv-from">
                            <option value="m3">m³</option>
                            <option value="dm3" selected>dm³ (lít)</option>
                            <option value="cm3">cm³ (ml)</option>
                        </select>
                    </div>
                    <div class="input-group"><label>Sang đơn vị</label>
                        <select class="input-field" id="hk-dv-to">
                            <option value="m3">m³</option>
                            <option value="dm3">dm³ (lít)</option>
                            <option value="cm3" selected>cm³ (ml)</option>
                        </select>
                    </div>
                    <button class="btn btn-primary btn-full" id="hk-dv-calc">Đổi</button>
                    <div id="hk-dv-result" style="margin-top:12px"></div>
                </div>
            </div>`;
        },

        bind3D(tab) {
            const container = document.getElementById('hk-3d');
            if (!container) return;
            const w = container.clientWidth || 340;
            const h = container.clientHeight || 340;
            init3D('hk-3d', w, h);

            if (tab === 'hop') {
                addBox(2.5, 1.5, 2);
                document.getElementById('hk-calc').addEventListener('click', () => {
                    const a = +document.getElementById('hk-a').value;
                    const b = +document.getElementById('hk-b').value;
                    const c = +document.getElementById('hk-c').value;
                    const scale = 4 / Math.max(a, b, c);
                    addBox(a * scale, b * scale, c * scale);
                    const sxq = (a + b) * 2 * c;
                    const stp = sxq + 2 * a * b;
                    const v = a * b * c;
                    document.getElementById('hk-result').innerHTML = `<div class="solution-card card">
                        ${MATH.step(1, MATH.expr(MATH.lbl('S<sub>xq</sub>'), MATH.eq(), MATH.txt('(' + a + ' + ' + b + ') × 2 × ' + c), MATH.eq(), MATH.val(sxq), MATH.unit('cm²')))}
                        ${MATH.step(2, MATH.expr(MATH.lbl('S<sub>tp</sub>'), MATH.eq(), MATH.val(sxq), MATH.op('+'), MATH.txt('2 × ' + a + ' × ' + b), MATH.eq(), MATH.val(stp), MATH.unit('cm²')))}
                        ${MATH.step(3, MATH.expr(MATH.lbl('V'), MATH.eq(), MATH.val(a), MATH.op('×'), MATH.val(b), MATH.op('×'), MATH.val(c), MATH.eq(), MATH.val(v), MATH.unit('cm³')))}
                    </div>`;
                });
            } else if (tab === 'lp') {
                addBox(2, 2, 2);
                document.getElementById('hk-lp-calc').addEventListener('click', () => {
                    const a = +document.getElementById('hk-lp-a').value;
                    const scale = 4 / a;
                    addBox(a * scale, a * scale, a * scale);
                    const sxq = a * a * 4;
                    const stp = a * a * 6;
                    const v = a * a * a;
                    document.getElementById('hk-lp-result').innerHTML = `<div class="solution-card card">
                        ${MATH.step(1, MATH.expr(MATH.lbl('S<sub>xq</sub>'), MATH.eq(), MATH.val(a), MATH.op('×'), MATH.val(a), MATH.op('×'), MATH.val(4), MATH.eq(), MATH.val(sxq), MATH.unit('cm²')))}
                        ${MATH.step(2, MATH.expr(MATH.lbl('S<sub>tp</sub>'), MATH.eq(), MATH.val(a), MATH.op('×'), MATH.val(a), MATH.op('×'), MATH.val(6), MATH.eq(), MATH.val(stp), MATH.unit('cm²')))}
                        ${MATH.step(3, MATH.expr(MATH.lbl('V'), MATH.eq(), MATH.val(a + '³'), MATH.eq(), MATH.val(v), MATH.unit('cm³')))}
                    </div>`;
                });
            } else if (tab === 'tru') {
                addCylinder(1.5, 3.5);
                document.getElementById('hk-tru-calc').addEventListener('click', () => {
                    const r = +document.getElementById('hk-tru-r').value;
                    const h = +document.getElementById('hk-tru-h').value;
                    const PI = 3.14;
                    const scale = 4 / Math.max(r * 2, h);
                    addCylinder(r * scale, h * scale);
                    const sxq = Math.round(2 * PI * r * h * 100) / 100;
                    const stp = Math.round((sxq + 2 * PI * r * r) * 100) / 100;
                    const v = Math.round(PI * r * r * h * 100) / 100;
                    document.getElementById('hk-tru-result').innerHTML = `<div class="solution-card card">
                        ${MATH.step(1, MATH.expr(MATH.lbl('S<sub>xq</sub>'), MATH.eq(), MATH.txt('2×3,14×' + r + '×' + h), MATH.eq(), MATH.val(sxq), MATH.unit('cm²')))}
                        ${MATH.step(2, MATH.expr(MATH.lbl('S<sub>tp</sub>'), MATH.eq(), MATH.val(sxq), MATH.op('+'), MATH.txt('2×3,14×' + r + '²'), MATH.eq(), MATH.val(stp), MATH.unit('cm²')))}
                        ${MATH.step(3, MATH.expr(MATH.lbl('V'), MATH.eq(), MATH.txt('3,14×' + r + '²×' + h), MATH.eq(), MATH.val(v), MATH.unit('cm³')))}
                    </div>`;
                });
            }
        },

        bindDonVi() {
            document.getElementById('hk-dv-calc')?.addEventListener('click', () => {
                const val = +document.getElementById('hk-dv-val').value;
                const from = document.getElementById('hk-dv-from').value;
                const to = document.getElementById('hk-dv-to').value;
                const toCm3 = { m3: 1e6, dm3: 1000, cm3: 1 };
                const cm3Val = val * toCm3[from];
                const result = cm3Val / toCm3[to];
                const names = { m3: 'm³', dm3: 'dm³', cm3: 'cm³' };
                document.getElementById('hk-dv-result').innerHTML =
                    MATH.answer(MATH.expr(MATH.val(val), MATH.txt(names[from]), MATH.eq(), MATH.val(result.toLocaleString('vi-VN')), MATH.txt(names[to])));
            });
        },

        destroy() { cleanup3D(); }
    };
    APP.register('hinh-khoi', MOD);
})();
