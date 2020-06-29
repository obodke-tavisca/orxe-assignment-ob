import { axe, toHaveNoViolations } from '@orxe-devkit/axe';
import { OrxeRatingBar } from '../index';

expect.extend(toHaveNoViolations);

describe('orxe-rating-bar-axe', () => {
  let ratingBar: OrxeRatingBar;

  beforeEach(async function() {
    await document.body.appendChild(document.createElement('orxe-rating-bar'));
    ratingBar = document.querySelector('orxe-rating-bar') as OrxeRatingBar;
    ratingBar.maxPossibleRating = 100;
    ratingBar.givenRating = 50;
    ratingBar.label = 'Result';
    await ratingBar.requestUpdate();
  });

  afterEach(async function() {
    await ratingBar.remove();
  });

  it('should support all WCAG Accessibility Rules. when default rating bar is rendered', async () => {
      const result = await axe(ratingBar);
      expect(result).toHaveNoViolations();
  });

  it('should support all WCAG Accessibility Rules. for donut rating bar', async () => {
      ratingBar.type = 'donut';
      await ratingBar.requestUpdate();
      const result = await axe(ratingBar);
      expect(result).toHaveNoViolations();
  });
});
