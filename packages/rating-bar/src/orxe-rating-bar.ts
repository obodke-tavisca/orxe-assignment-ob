import { html, customElement, LitElement, TemplateResult, property } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import styles from './style-css';

@customElement('orxe-rating-bar')
export default class OrxeRatingBar extends LitElement {

  @property({ type: String, reflect: true })
  type = 'linear';

  @property({ type: Number, reflect: true })
  givenRating = 0;

  @property({ type: String, reflect: true })
  label = '';

  @property({ type: Number, reflect: true })
  maxPossibleRating = 100;

  calcRating = 0;

  /**
   * Implement `render` to define a template for button element.
   */
  render() {
    return html`
      ${this._renderRatingBar()}
    `;
  }

  private _renderRatingBar(): TemplateResult {
    this._calculatePercentage();

    if (this.type == 'donut') {
      return html`
      <div class="donut-rating"
           style="${styleMap(this._getDonutPercentageStyles())}">
        <label class="donut-rating-label">${this.calcRating/10}</label>
      </div>
      `;
    } else {
      return html`
        <div class="linear-rating-bar">
          <span class="linear-rating-bar-spread"
                style="${styleMap(this._getLinearPercentageStyles())}"></span>
        </div>
        <div class="linear-rating-bar-info">
          <span class="linear-rating-bar-label">${this.label}</span>
          <span class="linear-rating-bar-value">${this.calcRating/10}</span>
        </div>
      `;
    }
  }

  private _calculatePercentage(): void {
    if (this.givenRating < 0) {
      this.calcRating = 0;
    } else if (this.givenRating < this.maxPossibleRating) {
      this.calcRating = parseFloat(((this.givenRating/this.maxPossibleRating) * 100).toFixed(2));
    } else {
      this.calcRating = 100;
    }
  }

  private _getLinearPercentageStyles(): any {
    const objfill = {};
    objfill['width'] = `${this.calcRating}%`;
    objfill['background-color'] = `var(${this._getPerformanceState()})`;
    if(this.calcRating === 100) {
      objfill['border-top-right-radius'] = objfill['border-bottom-right-radius'] = '20px';
    }
    return objfill;
  }

  private _getDonutPercentageStyles(): any {
    const objfill = {};
    objfill['background'] = `linear-gradient(var(--neutral),
              var(--neutral)) padding-box,
              conic-gradient(var(${this._getPerformanceState()}) ${this.calcRating}%,
              var(--background-01) ${this.calcRating}%) border-box`;
    return objfill;
  }

  private _getPerformanceState(): string {
    if (this.calcRating >= 1 && this.calcRating < 30) {
      return `--error`;
    } else if (this.calcRating >= 30 && this.calcRating < 50) {
      return `--rating-poor`;
    } else if (this.calcRating >= 50 && this.calcRating < 70) {
      return `--warning`;
    } else if (this.calcRating >= 70 && this.calcRating < 85) {
      return `--rating-great`;
    } else if (this.calcRating >= 85) {
      return `--primary`;
    } else {
      return '';
    }
  }

  /**
   *  Getting styles from components custom scss file
   */
  static styles = styles;
}
