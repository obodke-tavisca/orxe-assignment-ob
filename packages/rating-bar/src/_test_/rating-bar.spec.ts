import { OrxeRatingBar } from '../index';
import {
  toHaveStyle,
  toHaveTextContent,
  toHaveAttribute,
} from '@testing-library/jest-dom/matchers';

expect.extend({ toHaveStyle, toHaveTextContent, toHaveAttribute });

describe('orxe-rating-bar', () => {
  let ratingBar;

  beforeEach(async function() {
    OrxeRatingBar;

    ratingBar = document.createElement('orxe-rating-bar') as OrxeRatingBar;
    await document.body.append(ratingBar);
  });

  afterEach(async function() {
    await ratingBar.remove();
  });

  /**
   * Function that sets properties on the Custom Element.
   */
  async function setProperties(properties: object): Promise<void> {
    for (const property in properties) {
      if (ratingBar.hasOwnProperty(property)) {
        ratingBar[property] = properties[property];
      }
    }
    await ratingBar.requestUpdate();
  }


  function getDonutProgressBackground(state, per) {
    return `linear-gradient(var(--neutral),
      var(--neutral)) padding-box,
      conic-gradient(var(${state}) ${per}%,
          var(--background-01) ${per}%) border-box`;
  }

  it('should check default values of properties', async () => {
    expect(ratingBar.type).toEqual('linear');
    expect(ratingBar.givenRating).toEqual(0);
    expect(ratingBar.maxPossibleRating).toEqual(100);
    expect(ratingBar.label).toBeFalsy();
  });

  it('check Rating for linear rating bar', async () => {
    await setProperties({ givenRating: 90 });
    const ratingValue = ratingBar.shadowRoot.querySelector('.linear-rating-bar-value');
    expect(ratingValue).toHaveTextContent('9');
  });

  it('check label for linear rating bar', async () => {
    await setProperties({ givenRating: 10, label: 'Result' });
    const ratingValue = ratingBar.shadowRoot.querySelector('.linear-rating-bar-label');
    expect(ratingValue).toHaveTextContent('Result');
  });

  it('check progress for linear rating bar', async () => {
    await setProperties({ givenRating: 40 });
    const ratingWidthStyle = ratingBar.shadowRoot.querySelector('.linear-rating-bar-spread');
    expect(ratingWidthStyle).toHaveStyle({ width: '40%' });
  });

  it('check progress for linear rating bar when below 0', async () => {
    await setProperties({ givenRating: -10 });
    const ratingWidthStyle = ratingBar.shadowRoot.querySelector('.linear-rating-bar-spread');
    expect(ratingWidthStyle).toHaveStyle({ width: '0%' });
  });

  it('check progress for linear rating bar when more than 100 %', async () => {
    await setProperties({ givenRating: 150 });
    const ratingWidthStyle = ratingBar.shadowRoot.querySelector('.linear-rating-bar-spread');
    expect(ratingWidthStyle).toHaveStyle({ width: '100%' });
  });

  it('check rating label for Donut rating bar', async () => {
    await setProperties({ givenRating: 44, type: 'donut' });
    const donutRatingLabel = ratingBar.shadowRoot.querySelector('.donut-rating-label');
    expect(donutRatingLabel).toHaveTextContent('4.4');
  });

  it('check backfround for Donut rating bar when below 0', async () => {
    await setProperties({ givenRating: -10, type: 'donut' });
    const donutTrack = ratingBar.shadowRoot.querySelector('.donut-rating');
    expect(donutTrack).toHaveStyle({ background: getDonutProgressBackground('', 0)});
  });

  it('check background/progress for Donut rating bar when above 10', async () => {
    await setProperties({ givenRating: 140, type: 'donut' });
    const donutTrack = ratingBar.shadowRoot.querySelector('.donut-rating');
    expect(donutTrack).toHaveStyle({ background: getDonutProgressBackground('--primary', 100)});
  });

  it('check background/progress for Donut rating bar when rating in range 5-7', async () => {
    await setProperties({ givenRating: 60, type: 'donut' });
    const donutTrack = ratingBar.shadowRoot.querySelector('.donut-rating');
    expect(donutTrack).toHaveStyle({ background: getDonutProgressBackground('--warning', 60)});
  });

  it('check background/progress for Donut rating bar when rating above 8.5', async () => {
    await setProperties({ givenRating: 90, type: 'donut' });
    const donutTrack = ratingBar.shadowRoot.querySelector('.donut-rating');
    expect(donutTrack).toHaveStyle({ background: getDonutProgressBackground('--primary', 100)});
  });

  it('check background/progress for Donut rating bar when rating in range 3-5', async () => {
    await setProperties({ givenRating: 40, type: 'donut' });
    const donutTrack = ratingBar.shadowRoot.querySelector('.donut-rating');
    expect(donutTrack).toHaveStyle({ background: getDonutProgressBackground('--rating-poor', 40)});
  });

  it('check background/progress for Donut rating bar when rating in range 1-3', async () => {
    await setProperties({ givenRating: 20, type: 'donut' });
    const donutTrack = ratingBar.shadowRoot.querySelector('.donut-rating');
    expect(donutTrack).toHaveStyle({ background: getDonutProgressBackground('--error', 20)});
  });
});
