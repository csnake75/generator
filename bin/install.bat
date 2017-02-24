echo "installing energy-generator"

call npm run-script preinstall
echo "energy-generator is installed"

cd ../public/energy-generator-ui
call npm install --silent
call bower install --silent
echo "energy-generator-ui is installed"

cd ../../server/energy-generator-mock
call npm install --silent
echo "energy-generator-mock is installed"

cd ../../server/energy-generator-code
call npm install --silent
echo "energy-generator-code is installed"

cd ../../bin/