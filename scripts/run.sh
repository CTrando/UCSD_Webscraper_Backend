# constants
BUILD='--build'
ENV_PROD='PROD'
ENV_DEV='DEV'

# variables
SDSCHEDULE_SCRAPE=0
is_build=''
environment='DEV'

depends() {
  if type $1 >/dev/null 2>&1; then
    echo "✓ Found $1."
  else
    echo "✕ Failed to find $1."
    echo "Install an appropriate version of $1 before proceeding." 
    exit 1
  fi
}

check_depend() {
  depends docker
  depends docker-compose
}

check_directory() {
  if [ ! -d ".git" ]; then 
    echo "Error: Please run this script in your top level directory."
    exit 1
  fi
}

run_dev() {
  if [ ! -f "docker-compose.yml" ]; then 
    echo "Error: docker-compose.yml missing, which is required for docker-compose"
    echo "Please check the repo for missing files"
    exit 1
  fi

  export SDSCHEDULE_SCRAPE

  docker-compose up ${is_build}
}

run_prod() {
  if [ ! -f "docker-compose-production.yml" ]; then 
    echo "Error: docker-compose-production.yml missing, which is required for docker-compose"
    echo "Please check the repo for missing files"
    exit 1
  fi

  export SDSCHEDULE_SCRAPE

  docker-compose -f docker-compose-production.yml up ${is_build}
}

main() {
  check_directory
  check_depend

  case $environment in
    PROD)
      run_prod
    ;;
    DEV)
      run_dev
    ;;
    *)
      echo "Internal Error: Invalid Environment Setting"
      exit -1
    ;;
  esac
}

if [ $# -eq 0 ]; then
  echo
  echo "No args specified"
  echo "Run in development mode without downloading data"
  echo "Try '-h' or '--help' for help message"
  echo
fi

while test $# -gt 0; do
  case "$1" in 
      -h | --help) 
          echo "The run script for the UCSD Schedule Planner" 
          echo ""
          echo "-h, --help        Show this very helpful message"
          echo "-d, --download    Will download data fresh from Schedule of Classes"
          echo "-p, --production  Will run in production mode"
          echo "-b, --build       Will create the servers without rebuilding the docker containers"
          exit 0
          ;;
      -d | --download)
          SDSCHEDULE_SCRAPE=1
          ;;
      -p | --production)
          environment=${ENV_PROD}
          ;;
      -b | --build)
          is_build=${BUILD}
          ;;
      *)
          echo "Invalid arguments '$1' ignored"
          ;;
  esac
  shift
done

<<<<<<< HEAD
depends docker
depends docker-compose

docker-compose build --build-arg DOWNLOAD=${download}
docker-compose up 
=======
main
>>>>>>> 58674d3... redesign the run script with different docker files for different environments
