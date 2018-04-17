<?php
include 'Baglan.php';



if($_POST){
    //Veritabanına bağlanıldı
    $baglanti=(new Baglan())->basla();
    $baglanti->select_db("Admin");

    $array = array();

    //Bilgi indexleri oluşturuldu
    $array[0]="false";
    $array[1]="0";

    //ajaxdan bilgiler alındı
    $jop=$_POST["jop"];
    $lastid=$_POST["lastid"];
    $bildiri=$_POST["bildiri"];
    $id=$_POST["id"];

    //Uyeler tablosundan gelen id deki üyenin bildirisi alındı
    $now_bildiri=mysqli_fetch_object($baglanti->query("SELECT * FROM Uyeler WHERE id='$id'"))->bildiri;

    //Bildiri basamak uzunluğu 5 den büyük olunca bildiri sıfırlanır(integer aşmamak için)
    if(strlen($now_bildiri)>5){
        $query="UPDATE Uyeler SET bildiri=0 WHERE id='$id'";
        $baglanti->query($query);
    }

    //Arızaların sayısı alınıyor
    $result=$baglanti->query("SELECT COUNT(*) AS id FROM Arizalar");
    $dataCount=mysqli_fetch_assoc($result)['id'];


    if($dataCount==0){//hiç arıza yok ise
        echo json_encode("EMPTY");
    }else if($now_bildiri!=$bildiri){//gelen bildiri ile şuanki bildiri eşleşmiyorsa
        //bilgi indexleri güncellenir
        $array[0]="true";
        $array[1]=$now_bildiri;
        echo json_encode($array);
    }else{
        if($jop=="admin") {//kullanıcı admin ise

            $i=2;//ilk iki index bilgi indexi olduğundan sayac 2 den başlatılıyor
            //Tüm arızalar çekilir
            $result=$baglanti->query("SELECT * FROM Arizalar WHERE id>$lastid ORDER BY id ASC ");
            while ($value = mysqli_fetch_object($result)){
                //Arızalar diziye aktarılır
                $array[$i]["id"]=$value->id;
                $array[$i]["tcNo"]=$value->tcNo;
                $array[$i]["name"]=$value->isim;
                $array[$i]["email"]=$value->email;
                $array[$i]["tel"]=$value->tel;
                $array[$i]["complaint"]=$value->sikayet;
                $array[$i]["location"]=$value->yer;
                $array[$i]["malfunctions"]=$value->ariza;
                $array[$i]["complated"]=$value->tamamlandi;
                $i++;
            }

        }else{
            $i=2;//ilk iki index bilgi indexi olduğundan sayac 2 den başlatılıyor
            //Gelen mesleğe ait arızalar çekilir
            $result=$baglanti->query("SELECT * FROM Arizalar WHERE id>$lastid AND ariza='$jop' ORDER BY id ASC ");
            while ($value = mysqli_fetch_object($result)){
                //Arızalar diziye aktarılır
                $array[$i]["id"]=$value->id;
                $array[$i]["name"]=$value->isim;
                $array[$i]["email"]=$value->email;
                $array[$i]["tel"]=$value->tel;
                $array[$i]["complaint"]=$value->sikayet;
                $array[$i]["location"]=$value->yer;
                $array[$i]["complated"]=$value->tamamlandi;

                $i++;
            }
        }
        //veritabanı kapatılıp result boşaltılıyor
        mysqli_free_result($result);
        mysqli_close($baglanti);

        echo json_encode($array);
    }


}

?>