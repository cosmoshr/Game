const { renameSync } = require('fs')

const { version } = require('./package.json')

const { platform } = process

if (platform === 'darwin')
  renameSync(`./dist/Cosmos Habititation Race-${version}.dmg`, 'Cosmos_HR_Mac.dmg')
else if (platform === 'win32')
  renameSync(`./dist/Cosmos Habitiation Race Setup ${version}.exe`, 'Cosmos_HR_Windows.exe')

