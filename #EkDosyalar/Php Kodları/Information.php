<?php

    class Information{

        public function jop(){
            return $jop=array("Su","Elektrik","Doğal Gaz");
        }

        public function blok(){
            return $blok=array("A Blok","B Blok");
        }

        public function room(){
            $room=array();
            $j=0;
            for ($i=100; $i<1000; $i++){
                $room[$j++]=(string)$i;
            }

            return $room;
        }
    }

?>