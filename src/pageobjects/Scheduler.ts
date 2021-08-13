import { t } from 'testcafe'

import { WaitConfig } from '../config/WaitConfig'
import { getByText } from '@testing-library/testcafe'
import { ApiTestingPage } from './Github/ApiTestingPage'

const apiTestingPage = new ApiTestingPage()
const cancelButton = getByText("Cancel")
const saveButton = getByText("Save")
const scheduleAlreadyExists = getByText("A schedule with these settings already exists")

/**
 * Navigator is used to navigate to and from pages in bat.
 *
 */
export class Scheduler {
  public static async modifyScheduler(): Promise<Boolean> {
    await t.wait(WaitConfig.Waits.longShortWait)
    await t.click(apiTestingPage.schedulingTab)
    await t.wait(WaitConfig.Waits.minWait)
    await t.click(apiTestingPage.scheduleTable)
    await t.click(apiTestingPage.scheduleTableModify)
    await t.expect(apiTestingPage.scheduleHourly.value).eql("10", "Schedule value should be 1")
    await t.click(saveButton)
    return true
  }
  public static async deleteButtonCheck(suiteName: string) : Promise <Boolean>{
      await t.click(apiTestingPage.monitorSuiteCardContainer(suiteName))
      await t.expect(apiTestingPage.schedulingTab.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
      await t.click(apiTestingPage.schedulingTab)
      await t.click(apiTestingPage.scheduleActionContextMenu)
      await t.wait(WaitConfig.Waits.second)
      await t.click(apiTestingPage.scheduleDeleteButton)
      return true
  }

  public static async addAdvCron(suiteName: string, invalidCron: string) {
      await t.click(apiTestingPage.monitorSuiteCardContainer(suiteName))
      await t.expect(apiTestingPage.schedulingTab.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
      await t.click(apiTestingPage.schedulingTab)
      await t.click(apiTestingPage.ScheduleAddScheduleButton)
      await t.click(apiTestingPage.monitorScheduleValue)
      await t.click(apiTestingPage.monitorScheduleSelectValue)
      await t.typeText(apiTestingPage.cronExpresionField, invalidCron)
      await t.expect(apiTestingPage.scheduleFormAddButton.exists).ok()
      await t.click(cancelButton)
      return true
  }

  public static async add(suiteName: string, testName: string) : Promise <Boolean> {
    await t.click(apiTestingPage.monitorSuiteCardContainer(suiteName))
    await t.expect(apiTestingPage.schedulingTab.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
    await t.click(apiTestingPage.schedulingTab)
    await t.click(apiTestingPage.ScheduleAddScheduleButton)
    await t.expect(apiTestingPage.scheduleFormTestLabel(testName).exists).ok()
    await t.click(apiTestingPage.scheduleAddScheduleAddButton)
    return true
  }

  public static async addButtonCheck(suiteName: string) : Promise <Boolean> {
      await t.wait(WaitConfig.Waits.loadingBaseWait)
      await t.click(apiTestingPage.monitorSuiteCardContainer(suiteName))
      await t.expect(apiTestingPage.schedulingTab.exists).eql(true, {timeout: WaitConfig.Waits.minWait})
      await t.click(apiTestingPage.schedulingTab)
      await t.click(apiTestingPage.ScheduleAddScheduleButton)
      await t.click(apiTestingPage.scheduleAddScheduleAddButton)
      await t.expect(scheduleAlreadyExists.exists).eql(true)
      await t.click(cancelButton)
      return true    
  }
}
