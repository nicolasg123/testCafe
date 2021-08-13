import { Selector, t } from 'testcafe'
import { BasicPage } from '../commons/BasicPage'
import { WaitConfig } from '../../config/WaitConfig'
import { getByText } from '@testing-library/testcafe'



export class AddScheduleSelectors  {

  public functionalMonitoringLi = Selector('[data-test-id="/apitesting/ui"]')
  public addButton = Selector('span').withText('Add').nth(1)
  public footer = Selector ('div').withAttribute('class').withAttribute('data-anypoint-component','ModalFooter')
  public addScheduleButton = Selector('button').withAttribute('data-test-id','add-schedule-button')
  public monitorSchedule15Minutes = Selector('span').withAttribute('data-test-id','monitor-schedule-value-label-text').withText('Every 15 minutes')
  public hourlySchedule = Selector('span').withAttribute('id','react-select-11--value-item').
                          withAttribute('title','hourly').
                          withAttribute('data-test-id','monitor-schedule-value-label-text').
                          withText('Hourly')
  public privateLocation = Selector('div').withText('Select Location').nth(8)
  public monitorScheduleValue = Selector('div').withAttribute('data-test-id','monitor-schedule-value')
  public privateLocationOption = Selector('[data-anypoint-component="Option"]').nth(2)

}
