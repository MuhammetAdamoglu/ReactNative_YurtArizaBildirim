<?php
include 'Baglan.php';
include 'M_Bildir.php';

if($_POST){

    //Veritabanına bağlanılıyor
    $baglanti=(new Baglan())->basla();
    $baglanti->select_db("Admin");

    //ajaxdan veriler alınıyor
    $changeID=$_POST["changeID"];
    $status=$_POST["status"];
    $jop=$_POST["jop"];

    //değiştirilecek id ye ait arıza alınıyor
    $result=$baglanti->query("SELECT * FROM Arizalar WHERE id=($changeID)");
    $value=mysqli_fetch_object($result);

    if($status!="hayir"){//eğer tamamlanacak ise
        if($value->tamamlandi=="hayir"){//eğer tamamlanmamış ise
            //bildiri veriliyor
            $bildir=(new M_Bildir())->bildir($jop,$baglanti);
            //arıza tamamlanıyor
            $sql="UPDATE Arizalar SET tamamlandi='$status' WHERE id=($changeID)";

            if($baglanti->query($sql))
                echo json_encode("E");
            else
                echo json_encode("H");

        }else{//eğer tamamlanmış ise
            //kimin tamamladığı bilgisi gönderiliyor
            echo json_encode($value->tamamlandi);
        }
    }else{//eğer gerialınacak ise
        //geri alınıyor
        $bildir=(new M_Bildir())->bildir($jop,$baglanti);
        $sql="UPDATE Arizalar SET tamamlandi='$status' WHERE id=($changeID)";

        if($baglanti->query($sql))
            echo json_encode("E");
        else
            echo json_encode("H");
    }

    //veritabanı kapatılıp result boşaltılıyor
    mysqli_free_result($result);
    mysqli_close($baglanti);

}

?>