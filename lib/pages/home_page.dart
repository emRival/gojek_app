import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:gojek_app/datas/data_icons.dart';
import 'package:gojek_app/theme.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: green2,
        elevation: 0,
        toolbarHeight: 71,
        title: Container(
          padding: const EdgeInsets.all(5),
          decoration: BoxDecoration(
            color: green1,
            borderRadius: BorderRadius.circular(30),
          ),
          child: Row(
            children: [
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(100),
                ),
                child: Text(
                  'Beranda',
                  style: semibold14.copyWith(color: green1),
                ),
              ),
              Expanded(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: ["Promo", "Pesanan", "Chat"]
                      .map(
                        (title) => Flexible(
                          fit: FlexFit.loose,
                          child: Padding(
                            padding: const EdgeInsets.symmetric(
                                horizontal: 14, vertical: 12),
                            child: Center(
                              child: Text(
                                title,
                                style: semibold14,
                              ),
                            ),
                          ),
                        ),
                      )
                      .toList(),
                ),
              ),
            ],
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.only(top: 23, left: 15, right: 15),
              child: Row(
                children: [
                  Flexible(
                    fit: FlexFit.tight,
                    child: Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: const Color(0xffFAFAFA),
                        borderRadius: BorderRadius.circular(30),
                        border: Border.all(
                          color: const Color(0xffE8E8E8),
                        ),
                      ),
                      child: Row(
                        children: [
                          SvgPicture.asset(
                            "assets/icons/search.svg",
                            color: dark1,
                            width: 20,
                            height: 20,
                          ),
                          const SizedBox(
                            width: 10,
                          ),
                          Flexible(
                            fit: FlexFit.tight,
                            child: Text(
                              "Cari layanan, makanan, & tujuan",
                              style: regular14.copyWith(color: dark3),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(
                    width: 15,
                  ),
                  Stack(children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(100),
                      child: Image.asset(
                        "assets/images/avatar.png",
                        width: 35,
                        height: 35,
                      ),
                    ),
                    Positioned(
                      right: 0,
                      bottom: 0,
                      child: Container(
                        width: 15,
                        height: 15,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(100),
                          color: const Color(0xffD1E7EE),
                        ),
                        padding: const EdgeInsets.all(1.5),
                        child: SvgPicture.asset(
                          "assets/icons/goclub.svg",
                          color: blue2,
                        ),
                      ),
                    )
                  ]),
                ],
              ),
            ),
            const SizedBox(
              height: 15,
            ),
            Container(
              height: 96,
              margin: const EdgeInsets.symmetric(horizontal: 15),
              decoration: BoxDecoration(
                color: blue1,
                borderRadius: BorderRadius.circular(15),
              ),
              child: Row(
                children: [
                  Padding(
                    padding: const EdgeInsets.only(left: 10, right: 8),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          width: 3,
                          height: 8,
                          decoration: BoxDecoration(
                            color: dark3,
                            borderRadius: BorderRadius.circular(1),
                          ),
                        ),
                        const SizedBox(
                          height: 4,
                        ),
                        Container(
                          width: 3,
                          height: 8,
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(1),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Column(
                    children: [
                      Container(
                        height: 11,
                        width: 118,
                        decoration: const BoxDecoration(
                          color: Color(0xff9CCDDB),
                          borderRadius: BorderRadius.vertical(
                            bottom: Radius.circular(8),
                          ),
                        ),
                      ),
                      const SizedBox(
                        height: 5,
                      ),
                      Container(
                        height: 68,
                        width: 127,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Padding(
                          padding: const EdgeInsets.only(
                              top: 8, bottom: 3, left: 6, right: 20),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Image.asset(
                                "assets/images/gopay.png",
                                height: 14,
                              ),
                              Text(
                                "Rp12.379",
                                style: bold16,
                              ),
                              Text(
                                'Klik & cek riwayat',
                                style: semibold12_5.copyWith(color: green1),
                              )
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                  ...gopayIcons.map(
                    (icon) => Flexible(
                      fit: FlexFit.tight,
                      child: GopayCardItem(
                          svgAsset: "assets/icons/${icon.icon}.svg",
                          title: icon.title),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(
              height: 32,
            ),
            SizedBox(
              height: 175,
              child: GridView.builder(
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 4,
                ),
                itemBuilder: (context, index) {
                  final icon = menuIcons[index];
                  return Column(
                    children: [
                      Container(
                        height: 40,
                        width: 40,
                        decoration: BoxDecoration(
                          color: icon.color == purple ? null : icon.color,
                          shape: BoxShape.circle,
                        ),
                        child: SvgPicture.asset(
                          "assets/icons/${icon.icon}.svg",
                          color: icon.color == purple
                              ? purple
                              : icon.color == dark4
                                  ? dark2
                                  : null,
                        ),
                      ),
                      const SizedBox(
                        height: 9,
                      ),
                      Text(
                        icon.title,
                        style: regular12_5.copyWith(color: Colors.black),
                      ),
                    ],
                  );
                },
                itemCount: menuIcons.length,
              ),
            ),
            const SizedBox(
              height: 20,
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 15),
              child: Container(
                height: 65,
                clipBehavior: Clip.hardEdge,
                decoration: BoxDecoration(
                  border: Border.all(color: dark4),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Stack(
                  children: [
                    Positioned(
                      bottom: 0,
                      left: 8,
                      child: SvgPicture.asset("assets/icons/dots.svg"),
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 16, vertical: 12),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          SvgPicture.asset("assets/icons/star.svg"),
                          Padding(
                            padding: const EdgeInsets.only(
                              left: 16,
                              right: 16,
                            ),
                            child: Flexible(
                              child: Column(
                                mainAxisSize: MainAxisSize.min,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    '117 XP lagi ada Harta Karun',
                                    style: semibold14.copyWith(
                                        color: Colors.black),
                                  ),
                                  const SizedBox(
                                    height: 8,
                                  ),
                                  Stack(
                                    children: [
                                      Container(
                                        width: 209,
                                        height: 4,
                                        decoration: BoxDecoration(
                                          color: dark3,
                                          borderRadius:
                                              BorderRadius.circular(1),
                                        ),
                                      ),
                                      Container(
                                        width: 158,
                                        height: 4,
                                        decoration: BoxDecoration(
                                          color: green1,
                                          borderRadius:
                                              BorderRadius.circular(1),
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          ),
                          SvgPicture.asset(
                            "assets/icons/left.svg",
                            color: dark1,
                          ),
                        ],
                      ),
                    )
                  ],
                ),
              ),
            ),
            const SizedBox(
              height: 16,
            ),
            Padding(
              padding: const EdgeInsets.only(left: 15),
              child: Text(
                "Akses Cepat",
                style: bold18,
              ),
            ),
            const SizedBox(
              height: 10,
            ),
            Card(
              shape: Border.all(color: Colors.black),
              child:  SizedBox(
                height: 110,
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    children: [
                      Row(
                        children: [
                          Container(
                            height: 24,
                            width: 24,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              color: green1,
                            ),
                            child: SvgPicture.asset("assets/icons/goride.svg"),
                          )
                        ],
                      ),
                      const Row()
                    ],
                  ),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }

  Column GopayCardItem({required String svgAsset, required String title}) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Container(
          height: 24,
          width: 24,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(8),
          ),
          child: SvgPicture.asset(
            svgAsset,
            color: blue1,
          ),
        ),
        const SizedBox(
          height: 7,
        ),
        Text(
          title,
          style: semibold14,
        )
      ],
    );
  }
}
