import {Selector} from "testcafe";

/**
 * Navigation bar on designcenter
 */
export class NavBar {

    public static gotoDesignCenterButton = Selector("[data-test-id=\"navbar-page-name\"]");
    public static profileMenuTrigger = Selector("[data-test-id=\"navbar-profile-trigger-wrap\"]");
    public static profileMenuLogoutButton = Selector("[data-test-id=\"navbar-list-item-Sign-Out\"]");
}
