<?php
    include 'Baglan.php';

    if($_POST){
        //Veritabanına bağlanılıyor
        $baglanti=(new Baglan())->basla();
        $baglanti->select_db("Admin");

        //ajaxdan gelen veriler alınıyor
        $tc=$_POST["tc"];
        $yil=$_POST["year"];
        $isim=$_POST["name"];
        $soyisim=$_POST["lastname"];
        $email=$_POST['email'];
        $tel=$_POST['phone'];
        $complaint=$_POST['complaint'];
        $location=$_POST['blok']." Oda ".$_POST['room'];
        $jop=$_POST['jop'];

        //gelen bilgiler arızalar tablosuna ekleniyor
        $sql = "INSERT INTO Arizalar(tcNo, isim, email, tel, sikayet, yer, ariza, tamamlandi) VALUES ('$tc','$isim $soyisim','$email','$tel','$complaint','$location','$jop','hayir')";



        if($baglanti->query($sql)){
            echo json_encode("E");
        }else{
            echo json_encode("H");
        }

        //veritabanı kapatılılıyor
        mysqli_close($baglanti);

    }
?>