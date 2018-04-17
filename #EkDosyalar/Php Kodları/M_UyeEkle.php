<?php

include 'Baglan.php';

if($_POST){
    //Veritabanına bağlanılıyor
    $baglanti=(new Baglan())->basla();
    $baglanti->select_db("Admin");

    //ajaxdan veriler alınıyor
    $sifre=$_POST['password'];
    $kullaniciAdi=$_POST['username'];
    $isim=$_POST['name'];
    $soyisim=$_POST['lastname'];
    $email=$_POST['email'];
    $meslek=$_POST['jop'];
    $telefon=$_POST['tel'];

    //şifrenin hashi alınıyor
    $sifre=md5($sifre);

    //kullanıcı adı ve email üyeler tablosunda varmı diye bakılıyor
    $result=$baglanti->query("SELECT kullaniciAdi,email FROM Uyeler WHERE kullaniciAdi='$kullaniciAdi' OR email='$email'");
    $value =  mysqli_fetch_object($result);

    //herhangi biri var ise
    if($value->kullaniciAdi!="" || $value->email!=""){
        echo json_encode("Z");
    }else{//yok ise
        //bilgiler üyeler tablosuna ekleniyor
        $sql = "INSERT INTO Uyeler(kullaniciAdi, sifre, isim, soyisim, email, meslek, telefon, bildiri) VALUES ('$kullaniciAdi','$sifre','$isim','$soyisim','$email','$meslek','$telefon',0)";

        if($baglanti->query($sql)){
            echo json_encode("E");
        }else{
            echo json_encode("H");
        }
    }
    //veritabanı kapatılıp result boşaltılıyor
    mysqli_free_result($result);
    mysqli_close($baglanti);

}

?>
