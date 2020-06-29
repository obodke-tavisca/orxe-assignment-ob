## orxe-rating-bar

## Purpose
This component can be used to display a rating bar.

Linear rating bar : This will display rating bar in one line, it will also render label and percentage / rating.

Donut rating bar : This will display rating bar in circular shape with a fixed diameter along with a rating which is placed inside the rating bar.

Both the rating bars accepts rating on a range of 1-100 which is further divided by 10 to be displayed in the UI.

Additionally we can provide any given number which will get calculated in percent if we pass max possible rating. It will show percent in similar manner like divide by 10.

### Constructor
    @customElement('orxe-rating-bar')
    export default class OrxeRatingBar extends LitElement {
        ...
    }

### Properties
| Name    | Attribute        | Access modifier | Description         | Type   | Default
| -----   | -------------    | --------------- | -------------       | ------ | -------  
| Type    | Content Cell     |  Public         | Type of Rating Bar  | string | linear
| Rating  | givenRating      |  Public         | Actual ratings      | number | 0
| Label   | label            |  Public         | Label of Rating bar | string | ''
| Max     | maxPossibleRating|  Public         | Max possible rating | number | 100
  Possible                                      Eg: givenRating = 400 
  Rating                                        maxPossibleRating = 500


### Private Methods 
| Name                      | Signature                           | Description
| ------------------        | ---------------                     | -------------
| _renderRatingBar          | _renderRatingBar(): TemplateResult  | Rendering rating bar as per type
| _calculatePercentage      | _calculatePercentage(): void        | Calculate percentage as per input
| _getLinearPercentageStyles| _getLinearPercentageStyles(): object| return style object for linear bar
| _getDonutPercentageStyles | _getDonutPercentageStyles(): object | return style object for donut bar
| _getPerformanceState      | _getPerformanceState(): string      | return performance state eg. poor


### Usage
<!-- Default rating bar -->
<orxe-rating-bar></orxe-rating-bar>

<!-- rating bar with linear type and a initial rating -->
<orxe-rating-bar type="linear" givenRating="60"></orxe-rating-bar>

<!-- rating bar with donut type and a initial rating -->
<orxe-rating-bar type="donut" givenRating="30"></orxe-rating-bar>