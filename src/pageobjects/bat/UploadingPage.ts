import { Selector, t } from 'testcafe'
import { BasicPage } from '../commons/BasicPage'
import { WaitConfig } from '../../config/WaitConfig'

/**
 * Apitesting Page , pageobject for design center.
 */
export class UploadingPage implements BasicPage {

  public functionalMonitoringLi = Selector('[data-test-id="/apitesting/ui"]')
  public uploadButton = Selector('button').withAttribute('data-test-id','upload-button')
  public fileUploader = Selector ('#file-uploader-input')
  public uploadingMonitorText = Selector('#root').find('span').withText('Upload Monitor')
  public fileChooserText = Selector('#file-uploader-file-name')
  public chooseFolder = Selector('#file-uploader-button').find('span').withText('Choose folder')
  public cancelButtonText = Selector('#root').find('div').withText('Cancel').nth(4)
  public uploadCancelButton = Selector('button').withAttribute ('data-test-id','upload-cancel-button')

  public async at(): Promise<void> {
    await t.expect(this.functionalMonitoringLi.exists)
      .ok('Functional monitoring button not present', {timeout: WaitConfig.Waits.shortWait})
  }

}
