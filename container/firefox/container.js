;(function(HostAdmin){
	var EDITOR_URL = 'chrome://hostadmin/content/editor.html';
	var PERM_HELP_URL = HostAdmin.PERM_HELP_URL;

	// {{{ copy from https://developer.mozilla.org/en-US/docs/Code_snippets/Tabbed_browser
	function openAndReuseOneTabPerURL(url) {
		var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
			.getService(Components.interfaces.nsIWindowMediator);
		var browserEnumerator = wm.getEnumerator("navigator:browser");

		// Check each browser instance for our URL
		var found = false;
		while (!found && browserEnumerator.hasMoreElements()) {
			var browserWin = browserEnumerator.getNext();
			var tabbrowser = browserWin.gBrowser;

			// Check each tab of this browser instance
			var numTabs = tabbrowser.browsers.length;
			for (var index = 0; index < numTabs; index++) {
				var currentBrowser = tabbrowser.getBrowserAtIndex(index);
				//if (url == currentBrowser.currentURI.spec) {
				if (currentBrowser.currentURI.spec.indexOf(url) == 0) {

					// The URL is already opened. Select this tab.
					tabbrowser.selectedTab = tabbrowser.tabContainer.childNodes[index];

					// Focus *this* browser-window
					browserWin.focus();

					found = true;
					break;
				}
			}
		}

		// Our URL isn't open. Open it now.
		if (!found) {
			var recentWindow = wm.getMostRecentWindow("navigator:browser");
			if (recentWindow) {
				// Use an existing browser window
				recentWindow.delayedOpenTab(url, null, null, null, null);
			}
			else {
				// No browser windows are open, so open a new one.
				window.open(url);
			}
		}
	}
	// }}}

	var cur_host = "";

	var tabchange = function(e){
		var browser = gBrowser.selectedBrowser;
		cur_host = browser.contentWindow.window.location.host
	};

	gBrowser.tabContainer.addEventListener("TabOpen", tabchange, false);
	gBrowser.tabContainer.addEventListener("TabSelect", tabchange, false);
	gBrowser.tabContainer.addEventListener("TabAttrModified", tabchange, false);

	var opentab = function(t){
		var url = null;
		if(t == 'EDITOR'){
			url = EDITOR_URL;
		}else if (t == 'PERMHELP'){
			url = PERM_HELP_URL;
		}else{
			url = t;
		}

		if(url){
			openAndReuseOneTabPerURL(url);
			document.getElementById("hostadmin-menu-panel").hidePopup();
		}
	};

	HostAdmin.container = {
		opentab : opentab,
		curhost : function(){ return cur_host; }
	};

	var popuphelper = {
		HostAdmin : HostAdmin
	};
	var host_admin = HostAdmin.core;

	window.addEventListener('DOMWindowCreated', function(e){
		if(
		e.target.documentURI.indexOf(document.getElementById('hostadmin-menu-content').getAttribute('src')) === 0
		||
		e.target.documentURI.indexOf(EDITOR_URL) === 0
		){
			e.target.defaultView.window.firefox = popuphelper;
		}
	}, true);

	window.addEventListener("load", function(){
		document.getElementById('hostadmin-toolbar-button').addEventListener('command', function(e){
			var menucontent = document.getElementById('hostadmin-menu-content').contentWindow;
			menucontent.focus();
			// TODO dup code from popup.js
			host_admin.refresh();
			var $ = menucontent.window.$;
			var searchval = host_admin.real_hostname(cur_host);
			$("#search input").val(searchval).select().keyup();
		}, false);
	}, false);


})(window.HostAdmin);
