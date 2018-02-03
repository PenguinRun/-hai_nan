<?php
$obj = new fakeData();
$obj->getRows(300);


class fakeData {
  public $memberId, $fbId, $email, $target, $dbn;

  function fakeData() {
    $this->dbn = pg_connect("host=localhost port=5432 dbname=hainan user=postgres password=FinjonKiang");
  }

  function getRows($num) {
    for($i = 0; $i < $num; $i++) {
      $this->getTarget();
      $this->createMember();
      $this->createReports();
      $this->createEvents();
    }
  }

  function createMember() {
    $this->memberId = uuid_create();
    $this->fbId = rand();
    $this->email = $this->fbId . '@example.com';
    pg_query($this->dbn, "INSERT INTO members VALUES ('{$this->memberId}', '{$this->fbId}', '{$this->email}', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)");
  }

  function createReports() {
    $reportId = uuid_create();
    pg_query($this->dbn, "INSERT INTO reports VALUES ('{$reportId}', '{$this->target->id}', '需要清理', 'http://kiang.github.io/slides/20180204_fishackathon/beach_need_clean.jpg', '1', '{$this->memberId}', CURRENT_TIMESTAMP, '{$this->memberId}', CURRENT_TIMESTAMP)");
  }

  function createEvents() {
    $eventId = uuid_create();
    $days = rand(3, 30);
    pg_query($this->dbn, "INSERT INTO events VALUES ('{$eventId}', '{$this->target->id}', '{$this->target->title}淨灘活動', '來吧來吧', '{$this->email}', CURRENT_TIMESTAMP + INTERVAL '{$days} days', '就那邊', 'https://www.facebook.com/events/326378271203887/', '{$this->memberId}', CURRENT_TIMESTAMP, '{$this->memberId}', CURRENT_TIMESTAMP)");
  }

  function getTarget() {
    $result = pg_query($this->dbn, "SELECT * FROM targets ORDER BY random() LIMIT 1");
    $this->target = pg_fetch_object($result);
  }
}
