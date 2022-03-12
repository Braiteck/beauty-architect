$(() => {
	// Ширина окна для ресайза
	WW = $(window).width()


	// Основной слайдер на главной
	if ($('.main_slider .swiper-container').length) {
		new Swiper('.main_slider .swiper-container', {
			loop: true,
			speed: 750,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			on: {
				init: swiper => {
					setTimeout(() => {
						$(swiper.$el).addClass('swiper-container-delay')
					}, 5000)
				}
			}
		})
	}


	// Карусель товаров
	const productsSliders = []

	$('.products .swiper-container').each(function (i) {
		$(this).addClass('products_s' + i)

		let slides = $(this).find('.slide').length,
			options = {
				loop: false,
				speed: 500,
				simulateTouch: false,
				allowTouchMove: true,
				noSwiping: true,
				spaceBetween: 10,
				watchSlidesVisibility: true,
				slideActiveClass: 'active',
				slideVisibleClass: 'visible',
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				breakpoints: {
					0: {
						slidesPerView: 1
					},
					480: {
						slidesPerView: 2
					},
					768: {
						slidesPerView: 3
					},
					1024: {
						slidesPerView: 4
					}
				},
				on: {
					init: swiper => {
						setTimeout(() => {
							productHeight($(this), $(swiper.$el).find('.product_wrap').length)
						})
					},
					resize: swiper => {
						$(swiper.$el).find('.slide').height('auto')

						setTimeout(() => {
							productHeight($(this), $(swiper.$el).find('.product_wrap').length)
						})
					}
				}
			}

		productsSliders.push(new Swiper('.products_s' + i, options))

		if (slides > productsSliders[i].params.slidesPerView) {
			options.loop = true
			options.simulateTouch = true
			options.allowTouchMove = true
			options.noSwiping = false

			productsSliders[i].destroy(true, true)
			productsSliders[i] = new Swiper('.products_s' + i, options)
		}
	})


	// Карусель товаров
	if ($('.about_block .brands .swiper-container').length) {
		new Swiper('.about_block .brands .swiper-container', {
			loop: true,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				0: {
					spaceBetween: 24,
					slidesPerView: 2
				},
				480: {
					spaceBetween: 24,
					slidesPerView: 3
				},
				768: {
					spaceBetween: 32,
					slidesPerView: 4
				},
				1024: {
					spaceBetween: 40,
					slidesPerView: 3
				},
				1180: {
					spaceBetween: 80,
					slidesPerView: 3
				}
			},
		})
	}


	// Спойлер в тексте
	$('.seo_text .spoler_btn').click((e) => {
		e.preventDefault()

		$('.seo_text .spoler_btn').toggleClass('active')
		$('.seo_text .text_block').toggleClass('hide')
	})


	// Меню
	$('header .menu .level2 a').mouseenter(function () {
		let level3 = $(this).data('level3')

		$('header .menu .level2 a').removeClass('hover')
		$('header .menu .level3').hide()

		if (level3) {
			$(this).addClass('hover')
			$('header .menu ' + level3).fadeIn(300)
		}
	})


	// Товар в избранное
	$('.product .favorite_btn').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active')
	})


	// Боковая колонка - Фильтр
	$('.mob_filter_btn').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active').next().slideToggle(300)
	})


	$('aside .filter .name').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.item')

		$(this).toggleClass('active')
		parent.find('.data').slideToggle(300)
	})


	// Изменение вида отображения товаров
	$('.products_head .views .grid_btn').click(function (e) {
		e.preventDefault()

		$('.products_head .views .btn').removeClass('active')
		$(this).addClass('active')

		$('.products .list').addClass('row').removeClass('list')
	})

	$('.products_head .views .list_btn').click(function (e) {
		e.preventDefault()

		$('.products_head .views .btn').removeClass('active')
		$(this).addClass('active')

		$('.products .row').addClass('list').removeClass('row')
	})


	if ($(window).width() < 768) {
		$('.products .list').addClass('row').removeClass('list')
	}


	// Страница товара
	if ($('.product_info .images').length) {
		const productSlider = new Swiper('.product_info .images .swiper-container', {
			loop: false,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 24,
			slidesPerView: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			on: {
				slideChange: swiper => {
					setTimeout(() => {
						$('.product_info .images .thumbs button').removeClass('active')
						$('.product_info .images .thumbs button').eq(swiper.activeIndex).addClass('active')
					})
				}
			}
		})

		$('.product_info .images .thumbs button').click(function (e) {
			e.preventDefault()

			productSlider.slideTo($(this).data('slide-index'), 500)
		})
	}


	// Моб. меню
	$('.mob_header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').addClass('active')
		$('body').addClass('menu_open')
		$('header').addClass('show')
		$('.overlay').fadeIn(300)
	})

	$('header > .close, .overlay').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').removeClass('active')
		$('body').removeClass('menu_open')
		$('header').removeClass('show')
		$('.overlay').fadeOut(300)
	})


	// Моб. подвал
	$('footer .menu .title').click(function (e) {
		e.preventDefault()

		$(this).addClass('active').next().slideToggle(300)
	})


	// Отправка форм
	$('body').on('submit', '.form', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: '#success_modal',
			type: 'inline'
		}])
	})
})



$(window).on('load', () => {
	// Выравнивание элементов в сетке
	$('.products .row').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})
})



$(window).resize(() => {
	// Выравнивание элементов в сетке
	$('.products .row').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})


	// Изменение вида отображения товаров
	if ($(window).width() < 768) {
		$('.products .list').addClass('row').removeClass('list')
	}
})



// Выравнивание товаров
function productHeight(context, step) {
	let start = 0,
		finish = step,
		$products = context.find('.product_wrap')

	$products.height('auto')
	$products.find('.name').height('auto')

	$products.each(function () {
		setHeight($products.slice(start, finish))
		setHeight($products.slice(start, finish).find('.name'))

		start = start + step
		finish = finish + step
	})
}



$(window).on('resize', () => {
	if (typeof WW !== 'undefined' && WW != $(window).width()) {
		// Моб. версия
		if (!fiestResize) {
			$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
			if ($(window).width() < 375) $('meta[name=viewport]').attr('content', 'width=375, user-scalable=no')

			fiestResize = true
		} else {
			fiestResize = false
		}


		// Перезапись ширины окна
		WW = $(window).width()
	}
})