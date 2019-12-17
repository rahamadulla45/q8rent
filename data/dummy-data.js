import Product from '../models/product';

const PRODUCTS = [
    new Product(
        'p1',
        'u1',
        'Red Shirt',
        'http://surat99creationbazar.com/wp-content/uploads/2018/08/plain-tshirt-red.jpg',
        'A red t-shirt,perfect for days with non-red weather.',
        29.99
        ),
        new Product(
            'p2',
            'u1',
            'Blue Carpet',
            'https://ii1.pepperfry.com/media/catalog/product/p/o/494x544/polyester-3d-4d-contemporary-blue-carpet-5-x-8-ft--by-obsessions-polyester-3d-4d-contemporary-blue-c-8j20zf.jpg',
            'A red t-shirt,perfect for days with non-red weather.',
            29.99
            ),
            new Product(
                'p3',
                'u2',
                'Coffee Mug',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJFO49KjkhWeeY05FYB7J01hNuIt3tY206In_FVZQ4h9zMuec7zg',
                'A red t-shirt,perfect for days with non-red weather.',
                29.99
                ),
                new Product(
                    'p4',
                    'u2',
                    'The Book - Limited Edition',
                    'https://www.getfreeebooks.com/wp-content/uploads/2017/10/fi-programmingreac.jpg',
                    'A red t-shirt,perfect for days with non-red weather.',
                    29.99
                    ),
                    new Product(
                        'p5',
                        'u3',
                        'PowerBook',
                        'data:image/jpeg;base64,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',
                        'A red t-shirt,perfect for days with non-red weather.',
                        29.99
                        ),
                        new Product(
                            'p6',
                            'u1',
                            'Pen & Paper',
                            'https://joebuhlig.com/assets/posts/the-day-on-paper.jpeg',
                            'A red t-shirt,perfect for days with non-red weather.',
                            29.99
                            )
];

export default PRODUCTS;