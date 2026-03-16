/* ════════════════════════════════════════════
   MODULE: LUYỆN TẬP — Quiz tổng hợp
   Random questions from all topics
   Uses MATH helper for fraction display + step-by-step solutions
   ════════════════════════════════════════════ */
(() => {
    const MOD = {
        score: 0,
        total: 0,
        streak: 0,
        bestStreak: 0,
        currentAnswer: null,
        currentQuestion: null,
        timer: null,
        timeLeft: 0,

        render(el) {
            el.innerHTML = `
                <div class="section-header slide-up">
                    <h2>📝 Luyện Tập</h2>
                    <p>Thử thách kiến thức Toán lớp 5 — Trắc nghiệm tổng hợp!</p>
                </div>

                <div class="grid-2 slide-up" style="margin-bottom:16px">
                    <div class="card" style="text-align:center">
                        <div style="font-size:0.75rem;color:var(--text-muted);font-weight:600">🏆 Điểm số</div>
                        <div style="font-size:2.5rem;font-weight:900" id="lt-score" class="f-green">0</div>
                        <div style="font-size:0.75rem;color:var(--text-muted)" id="lt-ratio">0/0 câu đúng</div>
                    </div>
                    <div class="card" style="text-align:center">
                        <div style="font-size:0.75rem;color:var(--text-muted);font-weight:600">🔥 Chuỗi đúng</div>
                        <div style="font-size:2.5rem;font-weight:900" id="lt-streak" class="f-yellow">0</div>
                        <div style="font-size:0.75rem;color:var(--text-muted)" id="lt-best">Kỷ lục: 0</div>
                    </div>
                </div>

                <div class="card slide-up" id="lt-question-card" style="text-align:center">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                        <span id="lt-topic-badge" style="padding:3px 10px;border-radius:20px;font-size:0.72rem;font-weight:700;background:rgba(96,165,250,0.15);color:var(--accent-blue)"></span>
                        <span id="lt-timer" style="font-size:0.85rem;font-weight:700;color:var(--accent-yellow)">⏱️ 30s</span>
                    </div>
                    <div style="font-size:1.2rem;font-weight:800;padding:24px 0" id="lt-question">Nhấn "Bắt đầu" để chơi!</div>
                    <div id="lt-choices" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:16px"></div>
                    <div id="lt-feedback" style="margin-top:12px;font-weight:700;min-height:30px"></div>
                </div>

                <div id="lt-solution" style="margin-top:16px" class="slide-up"></div>

                <div style="display:flex;gap:8px;justify-content:center;margin-top:16px" class="slide-up">
                    <button class="btn btn-primary" id="lt-start-btn" onclick="ModuleLuyenTap.newQuestion()">🎮 Bắt đầu</button>
                    <button class="btn btn-secondary" onclick="ModuleLuyenTap.resetScore()">🔄 Chơi lại</button>
                </div>
            `;
        },

        generateQuestion() {
            const topics = ['phan-so', 'thap-phan', 'hinh-hoc', 'van-toc', 'van-toc-meet', 'van-toc-chase', 'phan-tram', 'hinh-phang', 'do-luong'];
            const topic = topics[Math.floor(Math.random() * topics.length)];
            switch (topic) {
                case 'phan-so': return this.genFractionQ();
                case 'thap-phan': return this.genDecimalQ();
                case 'hinh-hoc': return this.genGeometryQ();
                case 'van-toc': return this.genVelocityQ();
                case 'van-toc-meet': return this.genMeetQ();
                case 'van-toc-chase': return this.genChaseQ();
                case 'phan-tram': return this.genPercentQ();
                case 'hinh-phang': return this.genFlatGeoQ();
                case 'do-luong': return this.genMeasureQ();
            }
        },

        /* ── Fraction Questions ── */
        genFractionQ() {
            const type = Math.floor(Math.random() * 3);
            if (type === 0) {
                const a1 = Math.floor(Math.random() * 5) + 1;
                const a2 = Math.floor(Math.random() * 8) + 2;
                const b1 = Math.floor(Math.random() * 5) + 1;
                const b2 = Math.floor(Math.random() * 8) + 2;
                const va = a1 / a2, vb = b1 / b2;
                const answer = va > vb ? '>' : va < vb ? '<' : '=';
                const lcm = MATH.lcm(a2, b2);
                const na = a1 * (lcm / a2), nb = b1 * (lcm / b2);
                return {
                    topic: '📊 Phân Số',
                    question: `So sánh: ${MATH.expr(MATH.frac(a1, a2), MATH.txt('◻'), MATH.frac(b1, b2))}`,
                    isHTML: true,
                    answer,
                    choices: ['>', '<', '='],
                    choiceLabels: [`${a1}/${a2} > ${b1}/${b2}`, `${a1}/${a2} < ${b1}/${b2}`, `${a1}/${a2} = ${b1}/${b2}`],
                    solution:
                        MATH.step(1, MATH.expr(MATH.txt('Quy đồng mẫu'), MATH.val(lcm), MATH.txt(':'))) +
                        MATH.step(2, MATH.expr(MATH.frac(a1, a2), MATH.eq(), MATH.frac(na, lcm))) +
                        MATH.step(3, MATH.expr(MATH.frac(b1, b2), MATH.eq(), MATH.frac(nb, lcm))) +
                        MATH.step(4, MATH.expr(MATH.txt(`So sánh tử: ${na} ${answer} ${nb}`))) +
                        MATH.answer(MATH.frac(a1, a2) + `<span class="eq" style="font-size:1.4rem">${answer}</span>` + MATH.frac(b1, b2))
                };
            } else if (type === 1) {
                const d = Math.floor(Math.random() * 8) + 2;
                const a = Math.floor(Math.random() * (d - 1)) + 1;
                const b = Math.floor(Math.random() * (d - a)) + 1;
                const sum = a + b;
                const g = MATH.gcd(sum, d);
                const ansStr = g > 1 ? `${sum / g}/${d / g}` : `${sum}/${d}`;
                const wrong1 = `${a + b + 1}/${d}`;
                const wrong2 = `${a + b}/${d * 2}`;
                const choices = this.shuffleChoices(ansStr, wrong1, wrong2);
                let sol = MATH.step(1, MATH.expr(MATH.txt('Cùng mẫu → cộng tử:'), MATH.frac(`${a} + ${b}`, d)));
                sol += MATH.step(2, MATH.expr(MATH.eq(), MATH.frac(sum, d)));
                if (g > 1) sol += MATH.step(3, MATH.expr(MATH.txt('Rút gọn:'), MATH.frac(sum, d), MATH.eq(), MATH.frac(sum / g, d / g)));
                sol += MATH.answer(MATH.frac(a, d) + MATH.op('+') + MATH.frac(b, d) + MATH.eq() + MATH.frac(g > 1 ? sum / g : sum, g > 1 ? d / g : d));
                return {
                    topic: '📊 Phân Số',
                    question: MATH.expr(MATH.frac(a, d), MATH.op('+'), MATH.frac(b, d), MATH.eq(), MATH.txt('?')),
                    isHTML: true, answer: ansStr, choices, choiceLabels: choices,
                    solution: sol
                };
            } else {
                const pairs = [[1, 2, '0.5'], [1, 4, '0.25'], [3, 4, '0.75'], [1, 5, '0.2'], [2, 5, '0.4'], [3, 5, '0.6']];
                const [n, d, dec] = pairs[Math.floor(Math.random() * pairs.length)];
                const wrong1 = (parseFloat(dec) + 0.1).toFixed(1);
                const wrong2 = (parseFloat(dec) + 0.25).toFixed(2);
                const choices = this.shuffleChoices(dec, wrong1, wrong2);
                return {
                    topic: '📊 Phân Số',
                    question: MATH.expr(MATH.frac(n, d), MATH.eq(), MATH.txt('? (thập phân)')),
                    isHTML: true, answer: dec, choices, choiceLabels: choices,
                    solution:
                        MATH.step(1, MATH.expr(MATH.txt('Chia tử cho mẫu:'))) +
                        MATH.step(2, MATH.expr(MATH.frac(n, d), MATH.eq(), MATH.val(n), MATH.op('÷'), MATH.val(d))) +
                        MATH.answer(MATH.frac(n, d) + MATH.eq() + MATH.val(dec))
                };
            }
        },

        /* ── Decimal Questions ── */
        genDecimalQ() {
            const type = Math.floor(Math.random() * 2);
            if (type === 0) {
                const a = +(Math.random() * 50).toFixed(1);
                const b = +(Math.random() * 50).toFixed(1);
                const ans = +(a + b).toFixed(1);
                const wrong1 = +(ans + 0.1).toFixed(1);
                const wrong2 = +(ans - 1).toFixed(1);
                const choices = this.shuffleChoices(ans.toString(), wrong1.toString(), wrong2.toString());
                return {
                    topic: '🔢 Số Thập Phân',
                    question: MATH.expr(MATH.val(a), MATH.op('+'), MATH.val(b), MATH.eq(), MATH.txt('?')),
                    isHTML: true, answer: ans.toString(), choices, choiceLabels: choices,
                    solution:
                        MATH.step(1, MATH.expr(MATH.txt('Viết thẳng dấu phẩy, cộng từ phải sang trái'))) +
                        MATH.step(2, MATH.expr(MATH.val(a), MATH.op('+'), MATH.val(b))) +
                        MATH.answer(MATH.val(a) + MATH.op('+') + MATH.val(b) + MATH.eq() + MATH.val(ans))
                };
            } else {
                const a = +(Math.random() * 10 + 1).toFixed(1);
                const b = Math.floor(Math.random() * 9 + 2);
                const ans = +(a * b).toFixed(1);
                const wrong1 = +(ans + b).toFixed(1);
                const wrong2 = +(ans - a).toFixed(1);
                const choices = this.shuffleChoices(ans.toString(), wrong1.toString(), wrong2.toString());
                const dA = (a.toString().split('.')[1] || '').length;
                const intA = Math.round(a * Math.pow(10, dA));
                return {
                    topic: '🔢 Số Thập Phân',
                    question: MATH.expr(MATH.val(a), MATH.op('×'), MATH.val(b), MATH.eq(), MATH.txt('?')),
                    isHTML: true, answer: ans.toString(), choices, choiceLabels: choices,
                    solution:
                        MATH.step(1, MATH.expr(MATH.txt('Nhân bỏ dấu phẩy:'), MATH.val(intA), MATH.op('×'), MATH.val(b), MATH.eq(), MATH.val(intA * b))) +
                        MATH.step(2, MATH.expr(MATH.txt(`Có ${dA} chữ số thập phân → dời dấu phẩy`))) +
                        MATH.answer(MATH.val(a) + MATH.op('×') + MATH.val(b) + MATH.eq() + MATH.val(ans))
                };
            }
        },

        /* ── Geometry Questions ── */
        genGeometryQ() {
            const type = Math.floor(Math.random() * 2);
            if (type === 0) {
                const a = Math.floor(Math.random() * 8) + 2;
                const b = Math.floor(Math.random() * 6) + 2;
                const h = Math.floor(Math.random() * 5) + 2;
                const base = a * b;
                const ans = base * h;
                const wrong1 = a * b * (h + 1);
                const wrong2 = (a + b) * h;
                const choices = this.shuffleChoices(ans.toString(), wrong1.toString(), wrong2.toString());
                return {
                    topic: '🧊 Hình Học',
                    question: MATH.expr(MATH.txt('V hộp'), MATH.val(`${a}×${b}×${h}`), MATH.eq(), MATH.txt('?')),
                    isHTML: true, answer: ans.toString(), choices, choiceLabels: choices,
                    solution:
                        MATH.step(1, MATH.expr(MATH.lbl('S<sub>đáy</sub>'), MATH.eq(), MATH.val(a), MATH.op('×'), MATH.val(b), MATH.eq(), MATH.val(base))) +
                        MATH.step(2, MATH.expr(MATH.lbl('V'), MATH.eq(), MATH.lbl('S<sub>đáy</sub>'), MATH.op('×'), MATH.lbl('h'), MATH.eq(), MATH.val(base), MATH.op('×'), MATH.val(h))) +
                        MATH.answer(MATH.lbl('V') + MATH.eq() + MATH.val(ans))
                };
            } else {
                const r = Math.floor(Math.random() * 4) + 2;
                const h = Math.floor(Math.random() * 5) + 2;
                const base = Math.PI * r * r;
                const ans = Math.round(base * h * 10) / 10;
                const wrong1 = Math.round(Math.PI * r * h * 10) / 10;
                const wrong2 = Math.round(2 * base * h * 10) / 10;
                const choices = this.shuffleChoices(ans.toString(), wrong1.toString(), wrong2.toString());
                return {
                    topic: '🧊 Hình Học',
                    question: MATH.expr(MATH.txt('V hình trụ'), MATH.val(`r=${r}, h=${h}`), MATH.eq(), MATH.txt('?')),
                    isHTML: true, answer: ans.toString(), choices, choiceLabels: choices,
                    solution:
                        MATH.step(1, MATH.expr(MATH.lbl('S<sub>đáy</sub>'), MATH.eq(), MATH.txt('π'), MATH.op('×'), MATH.val(r + '²'), MATH.eq(), MATH.val(base.toFixed(2)))) +
                        MATH.step(2, MATH.expr(MATH.lbl('V'), MATH.eq(), MATH.val(base.toFixed(2)), MATH.op('×'), MATH.val(h), MATH.eq(), MATH.val(ans))) +
                        MATH.answer(MATH.lbl('V') + MATH.eq() + MATH.val(ans))
                };
            }
        },

        /* ── Velocity Basic Questions ── */
        genVelocityQ() {
            const type = Math.floor(Math.random() * 3);
            if (type === 0) {
                const v = (Math.floor(Math.random() * 8) + 3) * 10;
                const t = Math.floor(Math.random() * 5) + 2;
                const s = v * t;
                const wrong1 = v * (t + 1);
                const wrong2 = v + t;
                const choices = this.shuffleChoices(s + ' km', wrong1 + ' km', wrong2 + ' km');
                return {
                    topic: '🚀 Vận Tốc',
                    question: MATH.expr(MATH.lbl('V'), MATH.eq(), MATH.val(v + ' km/h'), MATH.txt(','), MATH.lbl('T'), MATH.eq(), MATH.val(t + 'h'), MATH.txt('→ S = ?')),
                    isHTML: true, answer: s + ' km', choices, choiceLabels: choices,
                    solution:
                        MATH.step(1, MATH.expr(MATH.lbl('S'), MATH.eq(), MATH.lbl('V'), MATH.op('×'), MATH.lbl('T'))) +
                        MATH.step(2, MATH.expr(MATH.lbl('S'), MATH.eq(), MATH.val(v), MATH.op('×'), MATH.val(t))) +
                        MATH.answer(MATH.lbl('S') + MATH.eq() + MATH.val(s) + MATH.unit('km'))
                };
            } else if (type === 1) {
                const t = Math.floor(Math.random() * 4) + 2;
                const v = (Math.floor(Math.random() * 6) + 3) * 10;
                const s = v * t;
                const wrong1 = (v + 10) + ' km/h';
                const wrong2 = (v - 15) + ' km/h';
                const choices = this.shuffleChoices(v + ' km/h', wrong1, wrong2);
                return {
                    topic: '🚀 Vận Tốc',
                    question: MATH.expr(MATH.lbl('V'), MATH.eq(), MATH.frac(s, t), MATH.eq(), MATH.txt('?')),
                    isHTML: true, answer: v + ' km/h', choices, choiceLabels: choices,
                    solution:
                        MATH.step(1, MATH.expr(MATH.lbl('V'), MATH.eq(), MATH.frac('S', 'T'))) +
                        MATH.step(2, MATH.expr(MATH.lbl('V'), MATH.eq(), MATH.frac(s, t))) +
                        MATH.answer(MATH.lbl('V') + MATH.eq() + MATH.val(v) + MATH.unit('km/giờ'))
                };
            } else {
                const v = (Math.floor(Math.random() * 6) + 3) * 10;
                const t = Math.floor(Math.random() * 5) + 2;
                const s = v * t;
                const wrong1 = (t + 1) + ' giờ';
                const wrong2 = (t - 1 || 1) + ' giờ';
                const choices = this.shuffleChoices(t + ' giờ', wrong1, wrong2);
                return {
                    topic: '🚀 Vận Tốc',
                    question: MATH.expr(MATH.lbl('T'), MATH.eq(), MATH.frac(s, v), MATH.eq(), MATH.txt('?')),
                    isHTML: true, answer: t + ' giờ', choices, choiceLabels: choices,
                    solution:
                        MATH.step(1, MATH.expr(MATH.lbl('T'), MATH.eq(), MATH.frac('S', 'V'))) +
                        MATH.step(2, MATH.expr(MATH.lbl('T'), MATH.eq(), MATH.frac(s, v))) +
                        MATH.answer(MATH.lbl('T') + MATH.eq() + MATH.val(t) + MATH.unit('giờ'))
                };
            }
        },

        /* ── Meeting Questions ── */
        genMeetQ() {
            const v1 = (Math.floor(Math.random() * 5) + 3) * 10;
            const v2 = (Math.floor(Math.random() * 4) + 2) * 10;
            const t = Math.floor(Math.random() * 3) + 2;
            const s = (v1 + v2) * t;
            const vSum = v1 + v2;
            const wrong1 = (t + 1) + ' giờ';
            const wrong2 = (t * 2) + ' giờ';
            const choices = this.shuffleChoices(t + ' giờ', wrong1, wrong2);
            return {
                topic: '🚗↔🏍️ Gặp nhau',
                question: MATH.expr(
                    MATH.txt('AB ='), MATH.val(s + 'km'), MATH.txt(','),
                    MATH.lbl('V₁'), MATH.eq(), MATH.val(v1), MATH.txt(','),
                    MATH.lbl('V₂'), MATH.eq(), MATH.val(v2),
                    MATH.txt('→ T = ?')
                ),
                isHTML: true, answer: t + ' giờ', choices, choiceLabels: choices,
                solution:
                    MATH.step(1, MATH.expr(MATH.txt('Tổng vận tốc:'), MATH.val(v1), MATH.op('+'), MATH.val(v2), MATH.eq(), MATH.val(vSum), MATH.unit('km/giờ'))) +
                    MATH.step(2, MATH.expr(MATH.lbl('T'), MATH.eq(), MATH.frac('S', 'V₁ + V₂'), MATH.eq(), MATH.frac(s, vSum))) +
                    MATH.answer(MATH.lbl('T') + MATH.eq() + MATH.val(t) + MATH.unit('giờ'))
            };
        },

        /* ── Chase Questions ── */
        genChaseQ() {
            const v1 = (Math.floor(Math.random() * 4) + 4) * 10;
            const v2 = (Math.floor(Math.random() * 3) + 1) * 10;
            const t = Math.floor(Math.random() * 3) + 2;
            const d = (v1 - v2) * t;
            const vDiff = v1 - v2;
            const wrong1 = (t + 1) + ' giờ';
            const wrong2 = (t - 1 || 1) + ' giờ';
            const choices = this.shuffleChoices(t + ' giờ', wrong1, wrong2);
            return {
                topic: '🚗→🏍️ Đuổi kịp',
                question: MATH.expr(
                    MATH.txt('Cách'), MATH.val(d + 'km'), MATH.txt(','),
                    MATH.lbl('V₁'), MATH.eq(), MATH.val(v1), MATH.txt(','),
                    MATH.lbl('V₂'), MATH.eq(), MATH.val(v2),
                    MATH.txt('→ T = ?')
                ),
                isHTML: true, answer: t + ' giờ', choices, choiceLabels: choices,
                solution:
                    MATH.step(1, MATH.expr(MATH.txt('Hiệu vận tốc:'), MATH.val(v1), MATH.op('−'), MATH.val(v2), MATH.eq(), MATH.val(vDiff), MATH.unit('km/giờ'))) +
                    MATH.step(2, MATH.expr(MATH.lbl('T'), MATH.eq(), MATH.frac('Khoảng cách', 'V₁ − V₂'), MATH.eq(), MATH.frac(d, vDiff))) +
                    MATH.answer(MATH.lbl('T') + MATH.eq() + MATH.val(t) + MATH.unit('giờ'))
            };
        },

        /* ── Percentage Questions ── */
        genPercentQ() {
            const type = Math.floor(Math.random() * 2);
            if (type === 0) {
                const a = Math.floor(Math.random() * 90) + 10;
                const b = Math.floor(Math.random() * 400) + 100;
                const pct = Math.round(a / b * 10000) / 100;
                const wrong1 = (pct + 5).toFixed(2) + '%';
                const wrong2 = (pct - 3 > 0 ? pct - 3 : pct + 8).toFixed(2) + '%';
                const choices = this.shuffleChoices(pct + '%', wrong1, wrong2);
                return {
                    topic: '💯 Phần Trăm',
                    question: MATH.expr(MATH.val(a), MATH.txt('là bao nhiêu % của'), MATH.val(b), MATH.txt('?')),
                    isHTML: true, answer: pct + '%', choices, choiceLabels: choices,
                    solution:
                        MATH.step(1, MATH.expr(MATH.val(a), MATH.op('÷'), MATH.val(b), MATH.eq(), MATH.val(Math.round(a / b * 10000) / 10000))) +
                        MATH.step(2, MATH.expr(MATH.val(Math.round(a / b * 10000) / 10000), MATH.op('×'), MATH.val(100), MATH.eq(), MATH.val(pct + '%'))) +
                        MATH.answer(MATH.val(a) + MATH.txt(' là ') + MATH.val(pct + '%') + MATH.txt(' của ') + MATH.val(b))
                };
            } else {
                const pct = [10, 15, 20, 25, 30, 40, 50, 75][Math.floor(Math.random() * 8)];
                const base = Math.floor(Math.random() * 400) + 100;
                const ans = base * pct / 100;
                const wrong1 = (ans + 10).toString();
                const wrong2 = (ans - 5 > 0 ? ans - 5 : ans + 15).toString();
                const choices = this.shuffleChoices(ans.toString(), wrong1, wrong2);
                return {
                    topic: '💯 Phần Trăm',
                    question: MATH.expr(MATH.val(pct + '%'), MATH.txt('của'), MATH.val(base), MATH.eq(), MATH.txt('?')),
                    isHTML: true, answer: ans.toString(), choices, choiceLabels: choices,
                    solution:
                        MATH.step(1, MATH.expr(MATH.val(base), MATH.op('×'), MATH.frac(pct, 100))) +
                        MATH.step(2, MATH.expr(MATH.eq(), MATH.val(base), MATH.op('×'), MATH.val(pct / 100))) +
                        MATH.answer(MATH.val(pct + '%') + MATH.txt(' của ') + MATH.val(base) + MATH.eq() + MATH.val(ans))
                };
            }
        },

        /* ── Flat Geometry Questions ── */
        genFlatGeoQ() {
            const type = Math.floor(Math.random() * 3);
            if (type === 0) {
                const a = Math.floor(Math.random() * 10) + 3;
                const h = Math.floor(Math.random() * 8) + 2;
                const s = a * h / 2;
                const wrong1 = (a * h).toString();
                const wrong2 = (s + 3).toString();
                const choices = this.shuffleChoices(s.toString(), wrong1, wrong2);
                return {
                    topic: '📐 Hình Phẳng',
                    question: MATH.expr(MATH.txt('S△ đáy ='), MATH.val(a), MATH.txt(', h ='), MATH.val(h), MATH.eq(), MATH.txt('?')),
                    isHTML: true, answer: s.toString(), choices, choiceLabels: choices.map(c => c + ' cm²'),
                    solution:
                        MATH.step(1, MATH.expr(MATH.lbl('S'), MATH.eq(), MATH.val(a), MATH.op('×'), MATH.val(h), MATH.op('÷'), MATH.val(2))) +
                        MATH.answer(MATH.lbl('S') + MATH.eq() + MATH.val(s) + MATH.unit('cm²'))
                };
            } else if (type === 1) {
                const a = Math.floor(Math.random() * 8) + 5;
                const b = Math.floor(Math.random() * 6) + 2;
                const h = Math.floor(Math.random() * 6) + 2;
                const s = (a + b) * h / 2;
                const wrong1 = (a * h).toString();
                const wrong2 = ((a + b) * h).toString();
                const choices = this.shuffleChoices(s.toString(), wrong1, wrong2);
                return {
                    topic: '📐 Hình Phẳng',
                    question: MATH.expr(MATH.txt('S hình thang a='), MATH.val(a), MATH.txt(', b='), MATH.val(b), MATH.txt(', h='), MATH.val(h), MATH.eq(), MATH.txt('?')),
                    isHTML: true, answer: s.toString(), choices, choiceLabels: choices.map(c => c + ' cm²'),
                    solution:
                        MATH.step(1, MATH.expr(MATH.lbl('S'), MATH.eq(), MATH.txt('(' + a + '+' + b + ')×' + h + '÷2'))) +
                        MATH.answer(MATH.lbl('S') + MATH.eq() + MATH.val(s) + MATH.unit('cm²'))
                };
            } else {
                const r = Math.floor(Math.random() * 6) + 2;
                const s = Math.round(r * r * 3.14 * 100) / 100;
                const wrong1 = Math.round(r * 2 * 3.14 * 100) / 100;
                const wrong2 = Math.round(r * r * 3 * 100) / 100;
                const choices = this.shuffleChoices(s.toString(), wrong1.toString(), wrong2.toString());
                return {
                    topic: '📐 Hình Phẳng',
                    question: MATH.expr(MATH.txt('S⊙ r ='), MATH.val(r), MATH.eq(), MATH.txt('?')),
                    isHTML: true, answer: s.toString(), choices, choiceLabels: choices.map(c => c + ' cm²'),
                    solution:
                        MATH.step(1, MATH.expr(MATH.lbl('S'), MATH.eq(), MATH.val(r), MATH.op('×'), MATH.val(r), MATH.op('×'), MATH.val('3,14'))) +
                        MATH.answer(MATH.lbl('S') + MATH.eq() + MATH.val(s) + MATH.unit('cm²'))
                };
            }
        },

        /* ── Measurement Questions ── */
        genMeasureQ() {
            const conversions = [
                { from: 'km', to: 'm', factor: 1000, fromVal: [1, 2, 3, 5] },
                { from: 'm', to: 'cm', factor: 100, fromVal: [2, 3, 5, 10] },
                { from: 'ha', to: 'm²', factor: 10000, fromVal: [1, 2, 3, 5] },
                { from: 'km²', to: 'ha', factor: 100, fromVal: [1, 2, 3] },
                { from: 'tấn', to: 'kg', factor: 1000, fromVal: [1, 2, 3, 5] }
            ];
            const c = conversions[Math.floor(Math.random() * conversions.length)];
            const val = c.fromVal[Math.floor(Math.random() * c.fromVal.length)];
            const ans = val * c.factor;
            const wrong1 = ans * 10;
            const wrong2 = ans / 10;
            const choices = this.shuffleChoices(ans.toString(), wrong1.toString(), wrong2.toString());
            return {
                topic: '📏 Đo Lường',
                question: MATH.expr(MATH.val(val + ' ' + c.from), MATH.eq(), MATH.txt('? ' + c.to)),
                isHTML: true, answer: ans.toString(), choices,
                choiceLabels: choices.map(v => v + ' ' + c.to),
                solution:
                    MATH.step(1, MATH.expr(MATH.txt('1 ' + c.from + ' = ' + c.factor.toLocaleString('vi-VN') + ' ' + c.to))) +
                    MATH.step(2, MATH.expr(MATH.val(val), MATH.op('×'), MATH.val(c.factor.toLocaleString('vi-VN')))) +
                    MATH.answer(MATH.val(val + ' ' + c.from) + MATH.eq() + MATH.val(ans.toLocaleString('vi-VN') + ' ' + c.to))
            };
        },

        shuffleChoices(correct, wrong1, wrong2) {
            const arr = [correct];
            if (wrong1 !== correct) arr.push(wrong1); else arr.push((parseFloat(correct) + 1) + '');
            if (wrong2 !== correct && wrong2 !== wrong1) arr.push(wrong2); else arr.push((parseFloat(correct) + 2) + '');
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        },

        newQuestion() {
            const q = this.generateQuestion();
            this.currentQuestion = q;
            this.currentAnswer = q.answer;

            document.getElementById('lt-topic-badge').textContent = q.topic;
            const qEl = document.getElementById('lt-question');
            if (q.isHTML) {
                qEl.innerHTML = q.question;
            } else {
                qEl.textContent = q.question;
            }
            document.getElementById('lt-feedback').innerHTML = '';
            document.getElementById('lt-solution').innerHTML = '';

            const choicesEl = document.getElementById('lt-choices');
            choicesEl.innerHTML = '';
            q.choices.forEach((c, i) => {
                const btn = document.createElement('button');
                btn.className = 'btn btn-secondary btn-full';
                btn.style.padding = '14px';
                btn.style.fontSize = '1rem';
                btn.textContent = q.choiceLabels ? q.choiceLabels[i] : c;
                btn.dataset.value = c;
                btn.onclick = () => this.checkAnswer(c, btn);
                choicesEl.appendChild(btn);
            });

            // Timer
            this.timeLeft = 30;
            if (this.timer) clearInterval(this.timer);
            document.getElementById('lt-timer').textContent = `⏱️ ${this.timeLeft}s`;
            this.timer = setInterval(() => {
                this.timeLeft--;
                const timerEl = document.getElementById('lt-timer');
                if (timerEl) timerEl.textContent = `⏱️ ${this.timeLeft}s`;
                if (this.timeLeft <= 0) {
                    clearInterval(this.timer);
                    this.handleTimeout();
                }
            }, 1000);

            document.getElementById('lt-start-btn').textContent = '⏭️ Bài tiếp';
        },

        showSolution(isCorrect) {
            const solEl = document.getElementById('lt-solution');
            if (!solEl || !this.currentQuestion || !this.currentQuestion.solution) return;
            const border = isCorrect ? 'rgba(52,211,153,0.3)' : 'rgba(248,113,113,0.3)';
            const bg = isCorrect ? 'rgba(52,211,153,0.05)' : 'rgba(248,113,113,0.05)';
            solEl.innerHTML = `<div class="card solution-card" style="border-color:${border};background:${bg}">
                <h3>📝 Lời giải</h3>
                ${this.currentQuestion.solution}
            </div>`;
        },

        checkAnswer(choice, btnEl) {
            if (this.timer) clearInterval(this.timer);
            document.querySelectorAll('#lt-choices button').forEach(b => b.disabled = true);
            const fb = document.getElementById('lt-feedback');
            this.total++;

            if (choice === this.currentAnswer) {
                this.score += 10;
                this.streak++;
                if (this.streak > this.bestStreak) this.bestStreak = this.streak;
                btnEl.style.background = 'linear-gradient(135deg, rgba(52,211,153,0.3), rgba(52,211,153,0.1))';
                btnEl.style.borderColor = 'var(--accent-green)';
                btnEl.style.color = 'var(--accent-green)';
                fb.innerHTML = '<span class="f-green">✅ Chính xác! +10 điểm</span>';
                this.showSolution(true);
            } else {
                this.streak = 0;
                btnEl.style.background = 'rgba(248,113,113,0.2)';
                btnEl.style.borderColor = 'var(--accent-red)';
                document.querySelectorAll('#lt-choices button').forEach(b => {
                    if (b.dataset.value === this.currentAnswer) {
                        b.style.background = 'linear-gradient(135deg, rgba(52,211,153,0.3), rgba(52,211,153,0.1))';
                        b.style.borderColor = 'var(--accent-green)';
                        b.style.color = 'var(--accent-green)';
                    }
                });
                fb.innerHTML = `<span class="f-red">❌ Sai rồi! Đáp án: <strong>${this.currentAnswer}</strong></span>`;
                this.showSolution(false);
            }
            this.updateDisplay();
        },

        handleTimeout() {
            this.total++;
            this.streak = 0;
            document.querySelectorAll('#lt-choices button').forEach(b => {
                b.disabled = true;
                if (b.dataset.value === this.currentAnswer) {
                    b.style.background = 'linear-gradient(135deg, rgba(52,211,153,0.3), rgba(52,211,153,0.1))';
                    b.style.borderColor = 'var(--accent-green)';
                }
            });
            document.getElementById('lt-feedback').innerHTML = `<span class="f-orange">⏰ Hết giờ! Đáp án: <strong>${this.currentAnswer}</strong></span>`;
            this.showSolution(false);
            this.updateDisplay();
        },

        updateDisplay() {
            const scoreEl = document.getElementById('lt-score');
            if (scoreEl) { scoreEl.textContent = this.score; scoreEl.classList.add('pop'); setTimeout(() => scoreEl.classList.remove('pop'), 300); }
            document.getElementById('lt-ratio').textContent = `${this.score / 10}/${this.total} câu đúng`;
            document.getElementById('lt-streak').textContent = this.streak;
            document.getElementById('lt-best').textContent = `Kỷ lục: ${this.bestStreak}`;
        },

        resetScore() {
            this.score = 0; this.total = 0; this.streak = 0; this.bestStreak = 0;
            if (this.timer) clearInterval(this.timer);
            document.getElementById('lt-score').textContent = '0';
            document.getElementById('lt-ratio').textContent = '0/0 câu đúng';
            document.getElementById('lt-streak').textContent = '0';
            document.getElementById('lt-best').textContent = 'Kỷ lục: 0';
            document.getElementById('lt-start-btn').textContent = '🎮 Bắt đầu';
            document.getElementById('lt-question').textContent = 'Nhấn "Bắt đầu" để chơi!';
            document.getElementById('lt-choices').innerHTML = '';
            document.getElementById('lt-feedback').innerHTML = '';
            document.getElementById('lt-solution').innerHTML = '';
            document.getElementById('lt-timer').textContent = '⏱️ 30s';
            document.getElementById('lt-topic-badge').textContent = '';
        },

        destroy() {
            if (this.timer) clearInterval(this.timer);
        }
    };

    window.ModuleLuyenTap = MOD;
    APP.register('luyen-tap', MOD);
})();
