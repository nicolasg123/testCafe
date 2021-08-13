import { t } from 'testcafe'
import { WaitConfig } from '../config/WaitConfig'
import { MonitorLandingPage } from './Github/MonitorLandingPage'
import { UploadingPage } from './Github/UploadingPage'


const monitorLandingPage = new MonitorLandingPage()
const uploadingPage = new UploadingPage()

/**
 * Navigator is used to navigate to and from pages in bat.
 *
 */
export default class Upload {

  /**
   * Logs in to the anypoint platform using the environment variables
   *
   */
  public static async performUpload(): Promise<boolean> {
    await t.click(uploadingPage.uploadButton)
    await t.expect(uploadingPage.uploadingMonitorText.exists).eql(true,{timeout: WaitConfig.Waits.minWait})
    await t.expect(uploadingPage.fileChooserText.innerText).eql("Choose monitor folder")
    await t.expect(uploadingPage.chooseFolder.innerText).eql("Choose folder")
    await t.expect(uploadingPage.cancelButtonText.innerText).eql("Cancel");
    //await t.setFilesToUpload(uploadingPage.fileUploader, ['../../resources/1/'])
    //await t.wait(WaitConfig.Waits.mediumWait)
    return true
  }
  
}
