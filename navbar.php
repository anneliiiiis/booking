<nav class="navbar navbar-default navbar-fixed-top">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="">Elulaseri broneerimine</a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
        <li class="addTime"><a href="#"><span class="glyphicon glyphicon-plus"></span> Lisa uus aeg</a></li>
        <li class="changeTime"><a href="#"><span class="glyphicon glyphicon-pencil"></span> Muuda aeg</a></li>
        <li class="deleteTime"><a href="#"><span class="glyphicon glyphicon-remove"></span> Kustuta aeg</a></li>

        <li class="addWorkSchedule"><a href="#"><span class="glyphicon glyphicon-tasks"></span> Määra graafik</a></li>
        <!--<li>
          <span class="glyphicon glyphicon-calendar pull-left"></span>
          <div class="input-append date pull-left" id="dp3" data-date="">
            <input class="span2 datepicker1" id="schedule_date" name="schedule_date" size="16" type="text" value="">
            <span class="add-on"><i class="icon-th"></i></span>
          </div>
          <button type="button" class="btn btn-primary pull-left" id="generateWeek">OK</button>
        </li>-->
        <div class="col-sm-4 col-md-4 pull-right">
          <form class="navbar-form">
            <div class="input-group">
              <input type="text" class=" form-control span2 datepicker1" id="schedule_date" name="schedule_date" size="16" type="text" value="">
            <span class="add-on"><i class="icon-th"></i></span>
              <div class="input-group-btn">
                <button class="btn btn-default pull-left" id="generateWeek"><i class="glyphicon glyphicon-calendar"></i></button>
              </div>
            </div>
          </form>
        </div>

      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="logout.php"><span class="glyphicon glyphicon-log-out"></span> Logi välja</a></li>
      </ul>
    </div>
  </div>
</nav>