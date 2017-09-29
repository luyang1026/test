var webdriver = require('selenium-webdriver')
var By = webdriver.By
var until = webdriver.until

var driver = new webdriver.Builder()
  .forBrowser('firefox')
  .build()

driver.get('https://www.baidu.com/')
driver.findElement(By.name('wd')).sendKeys('web')
driver.findElement(By.id('su')).click()
driver.wait(until.titleIs('web_百度搜'),1000)
driver.quit()