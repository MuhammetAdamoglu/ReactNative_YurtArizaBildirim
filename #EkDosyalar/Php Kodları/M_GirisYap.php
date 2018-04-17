<?php

    include 'Baglan.php';

    if($_POST){
        //Veritabanına bağlanılıyor
        $baglanti=(new Baglan())->basla();
        $baglanti->select_db("Admin");

        //ajaxdan veriler alınıyor
        $kullaniciAdi=$_POST['username'];
        $sifre=md5($_POST['password']);

        //Gelen kullanıcı adı ve şifre veritabanında sorgulanıyor
        $result=$baglanti->query("SELECT * FROM Uyeler WHERE kullaniciAdi='$kullaniciAdi' AND sifre='$sifre'");
        $value =  mysqli_fetch_object($result);

        $array = array();


        if($value->id!=null){//gelen kullanıc adı ve şifreye ait bir id var ise
            //result boşaltılıp veritabanı kapatılıyor
            mysqli_free_result($result);
            mysqli_close($baglanti);

            //bilgiler diziye aktarılıyor
            $array["id"]=$value->id;
            $array["meslek"]=$value->meslek;
            $array["bildiri"]=$value->bildiri;
            $array["kullaniciAdi"]=$value->kullaniciAdi;

            echo json_encode($array);

        }else{//yok ise
            $array["id"]="H";
            echo json_encode($array);
        }
    }
?>