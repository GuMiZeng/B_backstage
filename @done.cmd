@echo off
%1 mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0 ::","","runas",1)(window.close)&&exit
cd /d "%~dp0"
color 0A
echo ^>yarn -v
cmd /c yarn -v
echo:
echo ^>yarn config list
echo:
cmd /c yarn config list
echo:
cmd /k cd /d %cd%
