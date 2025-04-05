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
    const labels = JSON.parse(
      this.querySelector('script[data-attribute-name="labels"]')?.innerText ||
        '[]'
    );

    [...this.children].forEach(child => child.remove());
    this.figure = document.createElement('figure');

    this.steps = [];

    steps.forEach((step, i) => {
      const newStep = document.createElement('div');
      newStep.classList.add('table-wrapper');
      if (labels[i]) {
        const label = document.createElement('h5');
        label.innerText = labels[i];
        newStep.appendChild(label);
      }
      newStep.appendChild(step);
      this.figure.appendChild(newStep);

      this.steps.push(newStep);
    });
    this.steps[0].classList.add('selected');

    this.controls = document.createElement('figcaption');
    this.controls.setAttribute('aria-label', 'Replay steps');
    this.figure.appendChild(this.controls);
    this.appendChild(this.figure);
  }

  prepareControls() {
    this.prevButton = document.createElement('button');
    this.prevButton.innerText = 'Previous';
    this.prevButton.setAttribute('aria-disabled', 'true');

    this.nextButton = document.createElement('button');
    this.nextButton.innerText = 'Next';

    this.stepCounter = document.createElement('p');
    this.stepCounter.innerText = 'Step 0';

    this.controls.appendChild(this.prevButton);
    this.controls.appendChild(this.nextButton);
    this.controls.appendChild(this.stepCounter);

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
    this.stepCounter.innerText = `Step ${newSelectedStep}`;
    this.prevButton.setAttribute('aria-disabled', newSelectedStep === 0);
    this.nextButton.setAttribute(
      'aria-disabled',
      newSelectedStep === this.stepCount - 1
    );

    this.currentStep = newSelectedStep;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.adoptedStyleSheets.push(styles);
  customElements.define('step-visualizer', StepVisualizer);
});
