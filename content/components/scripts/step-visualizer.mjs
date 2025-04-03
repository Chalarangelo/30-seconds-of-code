import styles from '../styles/step-visualizer.css' with { type: 'css' };

class StepVisualizer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.prepareSteps();
    this.prepareControls();

    this.stepCount = this.steps.length;
    this.currentStep = 0;

    this.setAttribute('interactive', 'true');
  }

  prepareSteps() {
    const steps = [...this.querySelectorAll('.table-wrapper > table')];

    [...this.children].forEach(child => child.remove());
    this.figure = document.createElement('figure');

    this.steps = [];

    steps.forEach(step => {
      const newStep = document.createElement('div');
      newStep.classList.add('table-wrapper');
      newStep.appendChild(step);
      this.figure.appendChild(newStep);

      this.steps.push(newStep);
    });
    this.steps[0].classList.add('selected');

    this.figcaption = document.createElement('figcaption');
    this.figcaption.setAttribute('aria-label', 'Replay steps');
    this.figure.appendChild(this.figcaption);
    this.appendChild(this.figure);
  }

  prepareControls() {
    this.prevButton = document.createElement('button');
    this.prevButton.innerText = 'Previous';
    this.prevButton.setAttribute('aria-disabled', 'true');

    this.nextButton = document.createElement('button');
    this.nextButton.innerText = 'Next';

    this.stepCounter = document.createElement('p');
    this.stepCounter.innerText = 'Step 1';

    this.figcaption.appendChild(this.prevButton);
    this.figcaption.appendChild(this.nextButton);
    this.figcaption.appendChild(this.stepCounter);

    this.prevButton.addEventListener('click', () => {
      this.updateSelectedStep(this.currentStep - 1);
    });

    this.nextButton.addEventListener('click', () => {
      this.updateSelectedStep(this.currentStep + 1);
    });
  }

  updateSelectedStep(newSelectedStep) {
    if (newSelectedStep < 0 || newSelectedStep >= this.stepCount) return;

    this.steps[this.currentStep].classList.remove('selected');
    this.steps[newSelectedStep].classList.add('selected');
    this.stepCounter.innerText = `Step ${newSelectedStep + 1}`;
    this.prevButton.setAttribute('aria-disabled', newSelectedStep === 0);
    this.nextButton.setAttribute(
      'aria-disabled',
      newSelectedStep === this.stepCount - 1
    );

    this.currentStep = newSelectedStep;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  customElements.define('step-visualizer', StepVisualizer);
  document.adoptedStyleSheets.push(styles);
});
