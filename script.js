let seed = 0;
const randomiseButton = document.getElementById("randomise");
const seedDisplay = document.getElementById("seed");
const questionDisplay = document.getElementById("question");
const answerDisplay = document.getElementById("answer");

function makePrompt(prefix, answer)
{   
    return `<div>${ katex.renderToString(prefix) }</div>` + `<input oninput="if(this.value == '${ answer.toString() }') { this.classList.add('correct'); this.readOnly='true'; }" placeholder="answer"></input>`
}

function getNumberFromPosition(number, index)
{
    return parseInt(number.toString()[index]);
}

function getSignFromPosition(number, index)
{
    return [-1, 1][parseInt(number.toString()[index]) % 2]
}

function getSignedNumberFromPosition(number, index)
{
    return getNumberFromPosition(number, index) * getSignFromPosition(number, index + 1);
}

let questionBank = 
[
    {
        data: {},
        seed: (seed) => this.data = 
        {
            a: getSignedNumberFromPosition(seed, 0),
            b: getSignedNumberFromPosition(seed, 1),
            c: getSignedNumberFromPosition(seed, 2),
            d: getSignedNumberFromPosition(seed, 3),
            e: getSignedNumberFromPosition(seed, 4),
            f: getSignedNumberFromPosition(seed, 5)
        },
        question: (seed) => "Determine&nbsp;" + katex.renderToString(`${ ["x", "y", "z"][seed % 3] }`) + "&nbsp;such that&nbsp;" + katex.renderToString(`${ ["x", "y", "z"][seed % 3] }=\\begin{pmatrix}${ data.a }
                                                                                             \\\\${ data.b }
                                                                                             \\\\${ data.c }
                                                             \\end{pmatrix}\\cdot\\begin{pmatrix}${ data.d }
                                                                                             \\\\${ data.e }
                                                                                             \\\\${ data.f }\\end{pmatrix}`),
        prompt: (seed) => makePrompt(`${ ["x", "y", "z"][seed % 3] }=`, data.a * data.d 
                                                                    +   data.b * data.e
                                                                    +   data.c * data.f)
    },
    {
        data: {},
        seed: (seed) => this.data = 
        {
            a: getSignedNumberFromPosition(seed, 0),
            b: getSignedNumberFromPosition(seed, 1),
            c: getSignedNumberFromPosition(seed, 2),
            d: getSignedNumberFromPosition(seed, 3),
            e: getSignedNumberFromPosition(seed, 4),
            f: getSignedNumberFromPosition(seed, 5)
        },
        question: (seed) => "Determine&nbsp;" + katex.renderToString(`\\vec{v}`) + "&nbsp;such that&nbsp;" + katex.renderToString(`\\vec{v}=\\begin{pmatrix}${ data.a }
                                                                                             \\\\${ data.b }
                                                                                             \\\\${ data.c }
                                                             \\end{pmatrix}\\times\\begin{pmatrix}${ data.d }
                                                                                             \\\\${ data.e }
                                                                                             \\\\${ data.f }\\end{pmatrix}`),
        prompt: (seed) => makePrompt(`\\vec{v}=`, data.b * data.f - data.c * data.e)
                        + makePrompt(`\\hat{\\imath}+\\relax{}`, -(data.a * data.f - data.c * data.d))
                        + makePrompt(`\\hat{\\jmath}+\\relax{}`, data.a * data.e - data.b * data.d)
                        + katex.renderToString(`\\hat{k}`)
    },
    {
        data: {},
        seed: (seed) => this.data = 
        {
            a: getSignedNumberFromPosition(seed, 0),
            b: getSignedNumberFromPosition(seed, 1),
            c: getSignedNumberFromPosition(seed, 2),
            d: getSignedNumberFromPosition(seed, 3),
        },
        question: (seed) => "Determine&nbsp;" + katex.renderToString(`${ ["x", "y", "z"][seed % 3] }`) + "&nbsp;such that&nbsp;" + katex.renderToString(`${ ["x", "y", "z"][seed % 3] }=\\begin{pmatrix}${ data.a }
                                                                                             \\\\${ data.b }
                                                             \\end{pmatrix}\\cdot\\begin{pmatrix}${ data.c }
                                                                                             \\\\${ data.d }\\end{pmatrix}`),
        prompt: (seed) => makePrompt(`${ ["x", "y", "z"][seed % 3] }=`, data.a * data.c + data.b * data.d)
    },
    {
        data: {},
        seed: (seed) => this.data = 
        {
            a: getSignedNumberFromPosition(seed, 0),
            b: getSignedNumberFromPosition(seed, 1),
            c: getSignedNumberFromPosition(seed, 2),
            d: getSignedNumberFromPosition(seed, 3),
        },
        question: (seed) => "Determine the angle between the vectors&nbsp;" + katex.renderToString(`\\begin{pmatrix}${ data.a }\\\\${ data.b }\\end{pmatrix}`) 
                                                                            + "&nbsp;and&nbsp;" + katex.renderToString(`\\begin{pmatrix}${ data.c }\\\\${ data.d }\\end{pmatrix}`) + ". Answer to the nearest degree.",
        prompt: (seed) => makePrompt(`\\theta=`, Math.round(Math.acos((data.a * data.c + data.b * data.d)/(Math.sqrt(data.a * data.a + data.b * data.b) * Math.sqrt(data.c * data.c + data.d * data.d)))*180/Math.PI))
    },
    {
        data: {},
        seed: (seed) => this.data = 
        {
            a: getNumberFromPosition(seed, 0) * 0.05 + 0.1,
            b: getNumberFromPosition(seed, 1) * 0.05 + 0.1,
            c: Math.max(Math.min(getNumberFromPosition(seed, 2) * 0.05 + 0.5, 
                        getNumberFromPosition(seed, 0) * 0.05 + 0.1 + getNumberFromPosition(seed, 1) * 0.05 + 0.1),
                        Math.max(getNumberFromPosition(seed, 0) * 0.05 + 0.1, getNumberFromPosition(seed, 1) * 0.05 + 0.1)),
        },
        question: (seed) => `Let&nbsp;${ katex.renderToString("A") }&nbsp;and&nbsp;${ katex.renderToString("B") }&nbsp;be events such that 
                            &nbsp;${ katex.renderToString(`P(A)=${ data.a.toPrecision(2) }`) }, ${ katex.renderToString(`P(B)=${ data.b.toPrecision(2) }`) },
                            ${ katex.renderToString(`P(A\\cup B)=${ data.c.toPrecision(2) }`) }. Find ${ katex.renderToString(`P(A\\ \\vert\\ B)`) } to two decimal places.`,
        prompt: (seed) => makePrompt(`P(A\\ \\vert\\ B)=`, parseFloat(((data.a + data.b - data.c) / data.b).toPrecision(2)))
    },
    {
        data: {},
        seed: (seed) => this.data = 
        {
            a: getSignedNumberFromPosition(seed, 0),
            b: getSignedNumberFromPosition(seed, 1),
            c: getSignedNumberFromPosition(seed, 2),
            d: getSignedNumberFromPosition(seed, 3),
            e: getSignedNumberFromPosition(seed, 4),
            f: getSignedNumberFromPosition(seed, 5),
            g: getSignedNumberFromPosition(seed, 6),
            h: getSignedNumberFromPosition(seed, 7),
            i: getSignedNumberFromPosition(seed, 8),
        },
        question: (seed) => "",
        prompt: (seed) => makePrompt(`\\left|\\begin{matrix}${ data.a } & ${ data.b } & ${ data.c }\\\\${ data.d } & ${ data.e } & ${ data.f }\\\\${ data.g } & ${ data.h } & ${ data.i }\\end{matrix}\\right|=`, data.a * (data.e * data.i - data.f * data.h) - data.b * (data.d * data.i - data.f * data.g) + data.c * (data.d * data.h - data.e * data.g))
    }
];

function getQuestionFromSeed()
{
    seedDisplay.innerHTML = `Seed: ${ seed }`;

    const question = questionBank[seed % questionBank.length];
    question.seed(seed);
    questionDisplay.innerHTML = question.question(seed);
    answerDisplay.innerHTML = question.prompt(seed);
}

randomiseButton.addEventListener("click", () => 
{
    seed = 0;
    let multiplier = 1;
    for(let i = 0; i < 10; i++)
    {
        seed += multiplier * Math.floor(Math.random() * 10);
        multiplier *= 10;
    }

    getQuestionFromSeed();
});

seedDisplay.addEventListener("click", () =>
{
    let input = parseInt(prompt("Enter seed:"));
    if(!isNaN(input) && input > 999999999)
    {
        seed = input;        
    }

    getQuestionFromSeed();
});