HostAdmin
=====================
Saving your time when you switch domain-ip mapping between different environment

Installing
-----------------------------
 * [Chrome WebStore](https://chrome.google.com/webstore/detail/oklkidkfohahankieehkeenbillligdn)
 * [Firefox AddonSite](https://addons.mozilla.org/firefox/addon/hostadmin)
 * [Download from Google Code](http://code.google.com/p/fire-hostadmin/downloads/list)


How HostAdmin analyze the Hosts file
------------------------------------
 [Syntax detail](http://code.google.com/p/fire-hostadmin/wiki/HOST_SYNTAX)
 
 * Common 

  IP DOMAIN [#COMMENT]
  
  *Example:*

        127.0.0.1       localhost #comment here

  NOTE: A line with a comment, 'hide' (case-insensitive), would be hiden from HostAdmin.
 
 * Grouping

        #==== Groupname 
        
        # some mappings
        
        #====
   
   *Example:*
 
        #==== Project 1
        #127.0.0.1       localhost1
        127.0.0.1       localhost2
        127.0.0.1       localhost3
        #====
    
        #==== Project 2
        #127.0.0.1       localhost1
        #127.0.0.1       localhost2
        #127.0.0.1       localhost3
        #====

WRITE Permission to Hosts File
------------------------------
*WRITE Permission* to Hosts is needed, thus HostAdmin could modify your Host Files.
XP users need NO additional setting.
Here is a guide for you to gain write privilege for Vista/7/Linux/MacOS users

http://code.google.com/p/fire-hostadmin/wiki/GAIN_HOSTS_WRITE_PERM

DNS Auto refreshing
-------------------

 * Firefox

   HostAdmin borrowed code from [DNS flusher](https://addons.mozilla.org/en-US/firefox/addon/dns-flusher/) 
   to refresh dns when hosts file is modified.
   
 * Chrome
   
   Since Chrome 21, Chrome will auto refresh dns by itself.
   More info at this [ticket](http://code.google.com/p/chromium/issues/detail?id=125599)
 
 

 
