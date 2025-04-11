import Image from "next/image";
import { Cloud, Droplets, Thermometer, Wind } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HavaMelumati() {
  return (
    <div className="container bg-[white] mx-auto px-8 py-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Hava Məlumatı Necə Hazırlanır?
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Gündəlik hava məlumatı proqnozlarının hazırlanması mürəkkəb bir
          prosesdir. Bu səhifədə hava məlumatlarının necə toplandığını və
          proqnozların necə hazırlandığını öyrənəcəksiniz.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
        <Card>
          <CardHeader className="flex  flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Məlumat Toplama
            </CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Sensorlar</div>
            <p className="text-xs text-muted-foreground">
              Temperatur, təzyiq, rütubət
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Analiz</CardTitle>
            <Cloud className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Modellər</div>
            <p className="text-xs text-muted-foreground">Riyazi hesablamalar</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Proqnozlaşdırma
            </CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Alqoritmlər</div>
            <p className="text-xs text-muted-foreground">
              Kompüter proqramları
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yayım</CardTitle>
            <Wind className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Məlumat</div>
            <p className="text-xs text-muted-foreground">TV, radio, internet</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="toplama" className="mb-12">
        <TabsList className="grid w-full grid-cols-4  bg-[#594DB2]">
          <TabsTrigger className="text-white" value="toplama">
            Məlumat Toplama
          </TabsTrigger>
          <TabsTrigger className="text-white" value="analiz">
            Analiz
          </TabsTrigger>
          <TabsTrigger className="text-white" value="proqnoz">
            Proqnozlaşdırma
          </TabsTrigger>
          <TabsTrigger className="text-white" value="yayim">
            Yayım
          </TabsTrigger>
        </TabsList>
        <TabsContent value="toplama" className="p-4 border rounded-md mt-2">
          <h3 className="text-xl font-bold mb-2">
            Hava Məlumatı Toplama Prosesi
          </h3>
          <p className="mb-4">
            Hava məlumatı proqnozları üçün ilk addım dəqiq məlumatların
            toplanmasıdır. Bu proses müxtəlif cihazlar və metodlar vasitəsilə
            həyata keçirilir:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Meteoroloji stansiyalar - temperatur, təzyiq, rütubət və külək
              sürəti kimi əsas məlumatları ölçür
            </li>
            <li>
              Radiosondlar - atmosferin yuxarı qatlarından məlumat toplamaq üçün
              istifadə edilən hava balonları
            </li>
            <li>Peyklər - buludların hərəkəti və atmosfer şəraitini izləyir</li>
            <li>Radar sistemləri - yağıntı və fırtınaları aşkar edir</li>
            <li>
              Okean buyları - dəniz səthinin temperaturu və dalğa hündürlüyünü
              ölçür
            </li>
          </ul>
          <p className="mt-4">
            Bu cihazlardan toplanan məlumatlar mərkəzi sistemlərə ötürülür və
            burada analiz edilir.
          </p>
        </TabsContent>
        <TabsContent value="analiz" className="p-4 border rounded-md mt-2">
          <h3 className="text-xl font-bold mb-2">
            Hava Məlumatlarının Analizi
          </h3>
          <p className="mb-4">
            Toplanan məlumatlar güclü kompüterlər tərəfindən emal edilir. Bu
            mərhələdə:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Məlumatlar təmizlənir və normallaşdırılır</li>
            <li>Qlobal meteoroloji modellərə daxil edilir</li>
            <li>
              Atmosferin fiziki qanunlarına əsaslanan riyazi hesablamalar
              aparılır
            </li>
            <li>Keçmiş məlumatlarla müqayisə edilir</li>
          </ul>
          <p className="mt-4">
            Analiz prosesində ən çox istifadə edilən modellər arasında Avropa
            Mərkəzi Modeli (ECMWF), Amerika Modeli (GFS) və digər regional
            modellər var.
          </p>
        </TabsContent>
        <TabsContent value="proqnoz" className="p-4 border rounded-md mt-2">
          <h3 className="text-xl font-bold mb-2">
            Hava Proqnozunun Hazırlanması
          </h3>
          <p className="mb-4">
            Analiz edilmiş məlumatlar əsasında proqnozlar hazırlanır:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Qısamüddətli proqnozlar (1-3 gün) - daha dəqiq olur</li>
            <li>
              Ortamüddətli proqnozlar (4-10 gün) - ümumi tendensiyaları göstərir
            </li>
            <li>
              Uzunmüddətli proqnozlar (10+ gün) - daha çox ehtimal xarakteri
              daşıyır
            </li>
          </ul>
          <p className="mt-4">
            Meteoroloqlar kompüter modellərinin nəticələrini təhlil edir və öz
            təcrübələrinə əsaslanaraq son proqnozu hazırlayırlar. Bu zaman yerli
            xüsusiyyətlər də nəzərə alınır.
          </p>
        </TabsContent>
        <TabsContent value="yayim" className="p-4 border rounded-md mt-2">
          <h3 className="text-xl font-bold mb-2">
            Hava Məlumatının Yayımlanması
          </h3>
          <p className="mb-4">
            Hazırlanmış hava proqnozları müxtəlif kanallar vasitəsilə əhaliyə
            çatdırılır:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Televiziya və radio proqramları</li>
            <li>Rəsmi meteoroloji xidmət saytları</li>
            <li>Mobil tətbiqlər</li>
            <li>Sosial media platformaları</li>
            <li>SMS xəbərdarlıq sistemləri (təhlükəli hava şəraiti zamanı)</li>
          </ul>
          <p className="mt-4">
            Müasir dövrdə hava məlumatı proqnozları daha vizual və anlaşılan
            formada təqdim edilir, bu da insanlara gündəlik fəaliyyətlərini daha
            yaxşı planlaşdırmağa imkan verir.
          </p>
        </TabsContent>
      </Tabs>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Hava Məlumatı Texnologiyaları
          </h2>
          <p className="mb-4">
            Müasir hava proqnozları yüksək texnologiyalı cihazlar və sistemlər
            vasitəsilə hazırlanır. Bu texnologiyalar arasında süper kompüterlər,
            yüksək dəqiqlikli sensorlar və qabaqcıl proqram təminatları var.
          </p>
          <p>
            Son illərdə süni intellekt və maşın öyrənməsi metodları da hava
            proqnozlarının dəqiqliyini artırmaq üçün istifadə edilməyə başlanıb.
            Bu texnologiyalar keçmiş məlumatları analiz edərək daha dəqiq
            proqnozlar verməyə kömək edir.
          </p>
        </div>
        <div className="relative h-64 md:h-auto rounded-lg overflow-hidden">
          <Image
            src={require("../../../public/assets/weather-station.png")}
            alt="Meteoroloji mərkəz"
            
            className="object-cover"
          />
        </div>
      </div>

      <div className="bg-muted p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          Azərbaycanda Hava Məlumatı Xidmətləri
        </h2>
        <p className="mb-4">
          Azərbaycanda hava məlumatı proqnozları Ekologiya və Təbii Sərvətlər
          Nazirliyinin Milli Hidrometeorologiya Xidməti tərəfindən hazırlanır.
          Bu qurum ölkə ərazisində yerləşən meteoroloji stansiyalardan məlumat
          toplayır və müasir texnologiyalardan istifadə edərək proqnozlar
          hazırlayır.
        </p>
        <p>
          Hava məlumatı proqnozları televiziya, radio və internet vasitəsilə
          əhaliyə çatdırılır. Bundan əlavə, müxtəlif mobil tətbiqlər də
          Azərbaycan üçün hava proqnozları təqdim edir.
        </p>
      </div>
    </div>
  );
}
