import { Selector, t } from 'testcafe'
import { BasicPage } from '../commons/BasicPage'
import { WaitConfig } from '../../config/WaitConfig'


/**
 * Apitesting Page , pageobject for design center.
 */
export class CreateMonitorLandingPage implements BasicPage {

  public breadCrumbBackToMonitors = Selector('span').withExactText('Back to Monitors')
  public breadCrumbCreateMonitors = Selector('span').withExactText('Create Monitors')
  public functionalMonitoringLi = Selector('[data-test-id="/apitesting/ui"]')
  public createMessage = Selector('span').withText('Create a monitor from scratch')
  public monitorNameInput = Selector('[data-test-id="monitor-name-input"]')
  public nextButton = Selector('button').withExactText('Next')
  public endpointURL = Selector('[data-test-id="endpoint-url-input-0-input"]')
  public addEndpointButton = Selector('button').withExactText('Add Endpoint')
  public nextSetupButton = Selector('[data-test-id="next-setup"]')
  public nextEndpointsButton = Selector('[data-test-id="next-endpoints"][data-anypoint-component="Button"]')
  public createMonitorButton = Selector('button').withAttribute('data-test-id','landing-message-create')
  public createMonitorButtonWizard = Selector('button').withAttribute('data-test-id','create-monitor-reporters')
  public reportersSelect = Selector('div').withAttribute('data-test-id','reporter-form-0-0-type')
  public reporterValue = Selector ('input').withAttribute('data-test-id','reporter-form-0-0-value-input')
  public assertionField = Selector ('div').withAttribute('data-test-id','assertions-assertion-field-1-type-select-control')
  public bodyInputValue = Selector ('input').withAttribute('data-test-id','assertions-assertion-field-1-body-input')
  public assertionValueInput = Selector('input').withAttribute('data-test-id','assertions-assertion-field-1-value-input')
  public inputHeaders = Selector('div').withAttribute('data-test-id','assertions-assertion-field-1-headers')

  public async at(): Promise<void> {
    await t.expect(this.functionalMonitoringLi.exists)
      .ok('Functional monitoring button not present', {timeout: WaitConfig.Waits.shortWait})
  }
}
