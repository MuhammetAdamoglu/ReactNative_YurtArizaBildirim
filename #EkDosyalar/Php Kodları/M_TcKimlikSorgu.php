<?php

function tcno_dogrula($bilgiler){
    //gönderilecek veriler değişkene alınıyor
    $gonder = '<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                <TCKimlikNoDogrula xmlns="http://tckimlik.nvi.gov.tr/WS">
                <TCKimlikNo>'.$bilgiler["tcno"].'</TCKimlikNo>
                <Ad>'.$bilgiler["isim"].'</Ad>
                <Soyad>'.$bilgiler["soyisim"].'</Soyad>
                <DogumYili>'.$bilgiler["dogumyili"].'</DogumYili>
                </TCKimlikNoDogrula>
                </soap:Body>
                </soap:Envelope>';
    $ch = curl_init();//curl oluşturuluyor
    //bilgiler linke gönderiliyor
    curl_setopt($ch, CURLOPT_URL,            "https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx" );
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true );
    curl_setopt($ch, CURLOPT_POST,           true );
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_HEADER, FALSE);
    curl_setopt($ch, CURLOPT_POSTFIELDS,    $gonder);
    curl_setopt($ch, CURLOPT_HTTPHEADER,     array(
        'POST /Service/KPSPublic.asmx HTTP/1.1',
        'Host: tckimlik.nvi.gov.tr',
        'Content-Type: text/xml; charset=utf-8',
        'SOAPAction: "http://tckimlik.nvi.gov.tr/WS/TCKimlikNoDogrula"',
        'Content-Length: '.strlen($gonder)
    ));
    //sonuç alınıyor
    $gelen = curl_exec($ch);
    curl_close($ch);
    //sonuç döndürülüyor
    return strip_tags($gelen);
}

    if($_POST){
        //ajaxdan veriler alınıyor
        $tc=$_POST['tc'];
        $yil=$_POST['year'];
        //isim soyisim büyük harfe çevriliyor.
        $isim=mb_strtoupper(str_replace("i", "İ", $_POST['name']), 'utf-8');
        $soyisim=mb_strtoupper(str_replace("i", "İ", $_POST['lastname']), 'utf-8');

        //Bilgiler diziye koyuluyor
        $bilgiler = array(
            "isim"      => $isim,
            "soyisim"   => $soyisim,
            "dogumyili" => (string)$yil,
            "tcno"      => (string)$tc
        );

        //dizi kontrol edilmek için gönderiliyor
        $sonuc = tcno_dogrula($bilgiler);

        if($sonuc=="true"){//eğer kimlik bilgileri doğru ise
            echo json_encode("D");
        }else{//Yanlış ise
            echo json_encode("Y");
        }
    }


?>