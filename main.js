
document.addEventListener('DOMContentLoaded', () => {
    class LottoNumbers extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
        }

        render(numbers) {
            const style = `
                .numbers {
                    display: flex;
                    gap: 10px;
                }
                .number {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: #f0f2f5;
                    font-size: 24px;
                    font-weight: bold;
                    color: #333;
                }
            `;

            const numbersHTML = numbers.map(number => `<div class="number">${number}</div>`).join('');

            this.shadowRoot.innerHTML = `
                <style>${style}</style>
                <div class="numbers">
                    ${numbersHTML}
                </div>
            `;
        }
    }

    customElements.define('lotto-numbers', LottoNumbers);

    const generateBtn = document.getElementById('generate-btn');
    const lottoNumbersEl = document.querySelector('lotto-numbers');

    function generateLottoNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    // Initial generation
    lottoNumbersEl.render(generateLottoNumbers());

    // Click listener
    generateBtn.addEventListener('click', () => {
        lottoNumbersEl.render(generateLottoNumbers());
    });
});
