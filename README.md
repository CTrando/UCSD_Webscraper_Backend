# UCSD Schedule Planner 

**Live at [sdschedule.com](https://sdschedule.com)!**

Designed for and by UCSD students. Use this tool to automatically generate
your optimal class schedule without relying on WebReg.

# Details 

UCSD's class registration system, WebReg, is notoriously slow and clunky. 
During peak hours, students trying to plan their classes on WebReg might find
themselves unable to proceed, stuck waiting for a simple search query to load.
Everything about WebReg is extremely dated, from its outmoded user interface
to the bare minimum of features that it supports. Most importantly, WebReg
lacks the ability to generate schedules automatically, requiring users to
manually add each of their prospective classes themselves.

In this project, we attempted to address these concerns. UCSD Schedule Planner 
allows UCSD students to automatically generate schedules given a list of classes
that they are interested in. Students can indicate at what times they would 
prefer certain classes and can specify class priorities. All of the 
schedule generation legwork is handled by our system. Additionally, we boast
extremely fast load times, a clean, modern UI and near 100% uptime. Our
schedule generation tool also integrates with calendar frameworks like
Google Calendar and Apple Calendar, enabling students to export their new
schedule to the device of their choice.

<sub><sup>Note that the user must manually enroll in classes on WebReg itself; 
we only provide schedule generation utilities, not enrollment features.</sup></sub>

# System Requirements

The following utilities must be present for installation purposes: 

* docker
* docker-compose

# Installation 

Our tool is designed to be portable. We use docker to ensure that there is
clear separation between our tool's runtime environment and the
rest of your system.

To install, first clone the repository and `cd` into it:

```
git clone https://github.com/ctrando/UCSD-Planner-Helper && cd UCSD-Planner-Helper
```

Next, from the repository root directory, run the command:

```
sh scripts/docker-install.sh --download
```

Wait until the command finishes.

After the installation process has completed, you can run the following command to
start up the schedule generation tool:

```
docker-compose up
```

The server will be live at http://localhost:3000. Make sure the ports 3000 and 5000 
are not used on your machine.

# Contributing 

If you wish to contribute, please speak to [@ctrando](https://github.com/ctrando). 
We emphasize good testing practices as well as maintainable and well-documented code.
Contributing guidelines will be posted in the near future.
