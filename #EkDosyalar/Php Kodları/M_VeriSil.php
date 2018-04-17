<?php

    include 'Baglan.php';
    include 'M_Bildir.php';

    if($_POST) {
        //Veritabanına bağlanılıyor
        $baglanti=(new Baglan())->basla();
        $baglanti->select_db("Admin");

        //ajaxdan veriler alınıyor
        $deleteID = $_POST["deleteID"];
        $table = $_POST["table"];
        $jop=$_POST["jop"];

        //diğer meslektaşlara bildiriliyor
        $bildir=(new M_Bildir())->bildir($jop,$baglanti);

        //tablodaki id siliniyor
        $sql = "DELETE FROM $table WHERE id=$deleteID";
        if($baglanti->query($sql)){
            echo json_encode("E");
        }else{
            echo json_encode("H");
        }

        //veritabanı kapatılıyor
        mysqli_close($baglanti);
    }
?>