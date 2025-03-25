import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PrayerFAQs = () => {
  return (
    <div className="w-full max-w-3xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        Namaz vaxtları ilə bağlı tez-tez verilən suallar
      </h2>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-medium">
            Namaz vaxtları necə müəyyən edilir?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            Namaz vaxtları günəşin vəziyyətinə əsasən müəyyən olunur. Hər bir
            namazın özünəməxsus vaxtı var:
            <ul className="list-disc ml-6 mt-2">
              <li>Sübhdən əvvəl – Sübh namazı</li>
              <li>Günəşin zenitə yaxınlaşmasından sonra – Zöhr namazı</li>
              <li>Günəşin batmasına doğru – Əsr namazı</li>
              <li>Gün batdıqdan dərhal sonra – Məğrib namazı</li>
              <li>Qaranlıq düşdükdən sonra – İşa namazı</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-medium">
            Namaz vaxtlarını haradan öyrənə bilərəm?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            
              <a href="havam.az">
                Havam.az sizə hava proqnozu ilə birlikdə namaz vaxtlarını da
                təqdim edir. Ölkəmizin bütün şəhər və rayonları üçün mövcud ay
                üzrə namaz saatlarını təqdim edirik.
              </a>
            
            Namaz vaxtlarını öyrənmək üçün aşağıdakı mənbələrdən istifadə edə
            bilərsiniz:
            <ul className="list-disc ml-6 mt-2">
              <li>Rəsmi dini saytlar (məsələn, Qafqaz Müsəlmanları İdarəsi)</li>
              <li>Mobil tətbiqlər (Muslim Pro, Athan və s.)</li>
              <li>Məscidlərin divar cədvəlləri və elanları</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg font-medium">
            Namaz vaxtları mövsümə görə dəyişir?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            Bəli, namaz vaxtları fəsillərə və gün uzunluğuna görə dəyişir.
            Məsələn, yay aylarında sübh namazı daha erkən, qışda isə daha gec
            olur. Həmçinin, namaz vaxtları coğrafi yerə görə də fərqlənir.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-lg font-medium">
            Səfərdə olan biri üçün namaz vaxtları necə tənzimlənir?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            Səfərdə olan şəxs getdiyi şəhərin yerli vaxtına əsasən namaz
            qılmalıdır. Səfər halında Zöhr, Əsr və İşa namazları qısaldılaraq 2
            rükət qılınır (qəsr namazı).
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="text-lg font-medium">
            Günəşin doğması ilə sübh namazı arasında nə qədər vaxt olur?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600">
            Sübh namazı fecr (dan yeri) söküləndə başlayır və günəş doğana qədər
            davam edir. Bu müddət təxminən 1 saatdan bir qədər çox olur, lakin
            dəqiq vaxt üçün yerli namaz cədvəlinə baxmaq tövsiyə olunur.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PrayerFAQs;
