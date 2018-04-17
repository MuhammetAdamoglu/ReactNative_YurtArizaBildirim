<?php

class M_Bildir{
    function bildir($meslek,$baglanti){
        //gelen mesleğin ve adminin bildirimi 1 arttırılır
        $query="UPDATE Uyeler SET bildiri=bildiri+1 WHERE meslek='$meslek' OR meslek='admin'";
        $baglanti->query($query);
    }
}



?>