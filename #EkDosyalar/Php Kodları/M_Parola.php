<?php

include 'Baglan.php';
if($_POST){
    //Veritabanına bağlanılıyor
    $baglanti=(new Baglan())->basla();
    $baglanti->select_db("Admin");

    //ajaxdan gelen bilgiler alınıyor
    $ID=$_POST["id"];
    $password=md5($_POST["password"]);
    $password_new=md5($_POST["password_new"]);

    //gelen id ye ait gelen parola sorgulanıyor
    $result=$baglanti->query("SELECT * FROM Uyeler WHERE id='$ID' AND sifre='$password'");
    $value =  mysqli_fetch_object($result);

    if($value->id!=null){//var ise
        //gelen yeni parola ile güncelleniyor
        $sql="UPDATE Uyeler SET sifre='$password_new' WHERE id=($ID)";

        if($baglanti->query($sql))
            echo json_encode("E");
        else
            echo json_encode("H");
    }
    else//Parola hatalı ise
        echo json_encode("C_H");

    //Sunucu kapatılıp result boşaltılıyor
    mysqli_close($baglanti);
    mysqli_free_result($result);

}

?>