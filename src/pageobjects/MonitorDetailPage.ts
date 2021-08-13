import { Selector, t } from 'testcafe'
import { MonitorDetailPageSelector } from './Github/MonitorDetailPageSelector'
import { MonitoringLandingAfterCreation } from './Github/MonitoringLandingActionBar'
import { WaitConfig } from '../config/WaitConfig'
import { RunMonitorDialogSelectors } from './Github/RunMonitorDialogSelectors'
import { AddScheduleSelectors } from './Github/AddScheduleSelectors'
import { MonitorEditPageSelectors } from './Github/MonitorEditPageSelectors'

const monitorDetailPageSelector = new MonitorDetailPageSelector()
const monitoringLandingAfterCreation = new MonitoringLandingAfterCreation()
const runMonitorDialog = new RunMonitorDialogSelectors()
const addScheduleSelectors = new AddScheduleSelectors()
const monitorEditPageSelectors = new MonitorEditPageSelectors()

/**
 * Navigator is used to navigate to and from pages in bat.
 *
 */
export class MonitorDetailPage {
  
  public static async checkAssertionsSection(testNameAdv:string) : Promise<boolean> {
    await t.click(monitoringLandingAfterCreation.failingSuiteSummaries)
    await t.hover(Selector('#failingSuiteSummaries').find('div').withText(testNameAdv).nth(3), {
      speed: 0.5
    })
    await t.click(monitoringLandingAfterCreation.editButton)
    await t.wait(WaitConfig.Waits.second)
    t.expect(monitorEditPageSelectors.assertionValue.exists).ok
    return true;
  }
  
  public static async addAdvSchedule() : Promise<boolean> {
    await t.click(monitoringLandingAfterCreation.passedAnchor)
    await t.click(monitoringLandingAfterCreation.containerDiv)
    await t.click(addScheduleSelectors.addScheduleButton)
    await t.click(addScheduleSelectors.monitorScheduleValue)
    await t.typeText(addScheduleSelectors.monitorScheduleValue,'Every 15 minutes')
    await t.pressKey('tab')
    await t.click(addScheduleSelectors.addButton)
    await t.wait(WaitConfig.Waits.second)
    await t.expect(monitorDetailPageSelector.nextRunTable.childElementCount).eql(2);
    return true
  }
  
  public static async DownloadMonitor() : Promise<boolean>  {
    await t.click(monitoringLandingAfterCreation.passedAnchor)
    await t.click(monitoringLandingAfterCreation.containerDiv)
    await t.click(monitorDetailPageSelector.contextMenu)
    await t.wait(WaitConfig.Waits.second)
    await t.click(monitorDetailPageSelector.downloadButton)
    await t.wait(WaitConfig.Waits.second)
   return true; 
  }
  
  public static async checkLanding() : Promise<boolean> {
   await t.click(monitoringLandingAfterCreation.passedAnchor)
   await t.click(monitoringLandingAfterCreation.containerDiv)
   await t.wait(WaitConfig.Waits.minWait)
   await t.expect(monitorDetailPageSelector.runNowButton.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
   await t.expect(monitorDetailPageSelector.historyButton.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
   await t.expect(monitorDetailPageSelector.contentTest.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
   await t.expect(monitorDetailPageSelector.simpleExecutionDiv.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
   await t.expect(monitorDetailPageSelector.nextRunHeader.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
   await t.expect(monitorDetailPageSelector.lastExecutionHeader.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
   await t.expect(monitorDetailPageSelector.backToMonitorsButton.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
   await t.expect(monitorDetailPageSelector.addScheduleButton.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
   return true
  }

  public static async backToMonitorSection() : Promise<boolean> {
    await t.click(monitorDetailPageSelector.backToMonitorsButton)
    return true
  }

  public static async runNow() : Promise<boolean> {
    await t.click(monitoringLandingAfterCreation.passedAnchor)
    await t.click(monitoringLandingAfterCreation.containerDiv)
    await t.click(monitorDetailPageSelector.runNowButton)
    await t.expect(runMonitorDialog.headerTitle.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(runMonitorDialog.executionLocation.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(runMonitorDialog.configuration.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.click(runMonitorDialog.locationSelect)
    await t.click(runMonitorDialog.locationOption)
    await t.click(runMonitorDialog.runNow)
    return true
  }

  public static async addSchedule() : Promise<boolean> {
    await t.click(monitorDetailPageSelector.addScheduleButton)
    await t.wait(WaitConfig.Waits.second)
    await t.click(addScheduleSelectors.footer)
    await t.click(addScheduleSelectors.addButton)
    return true
  }  
   public static async folderHasZipFile(name) {
    //requiring path and fs modules
    const path = require('path');
    const fs = require('fs');
    const os = require('os');
    //home dir
    const home = os.homedir();
    //joining path of directory
    const directoryPath = path.join(home, '/Downloads');
    return new Promise((resolve, reject) => {
      fs.readdir(directoryPath, function (err, files) {
      //handling error
      if (err) {
          reject('Unable to scan directory: ' + err)
      }
      const result = !!files
        .find(function (file) {
          //file is .zip and has _name_
          const ext = file.substring(file.indexOf('.') + 1);
          const fileName = name.toLowerCase();
          const number = file.includes(fileName);
          //search a string on a string
          return ext.trim().includes('zip') && number
        });
       resolve(result) 
      });
    })
  }
}