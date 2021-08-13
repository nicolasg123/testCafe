import { Selector, t } from 'testcafe'
import { BasicPage } from '../commons/BasicPage'
import { WaitConfig } from '../../config/WaitConfig'
import { getByText } from '@testing-library/testcafe'



export class MonitorEditPageSelectors  {

  public assertionValue = Selector('input').withAttribute('value','assertion')
}
