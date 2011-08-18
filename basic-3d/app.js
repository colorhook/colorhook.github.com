var App = {
	currentId: -1,
	map:[],
	register: function(id, obj){
		this.map[id] = obj
	},
	onSlideChange: function(id){
		var item = this.map[this.currentId];
		if(item){
			item.deactive && item.deactive();
		}
		this.currentId = id;
		item = this.map[this.currentId];
		
		if(!item){return}
		if(!item.initialized){
			item.init && item.init();
		}
		item.active && item.active();
	}
};
window.onSlideChange = function(i){
	App.onSlideChange(i);
};
//slide
(function(){
	var v1 = new Vector3d(-280, 0, 100),
		v2 = new Vector3d(0, 0, 100),
		v3 = new Vector3d(280, 0, 100),
		vArr = [v1, v2, v3],
		img1 = document.getElementById("slide5_img1"),
		img2 = document.getElementById("slide5_img2"),
		img3 = document.getElementById("slide5_img3"),
		imgs = [img1, img2, img3],
		current = null,
		timer,
		toggleTo = function(index){
			if(timer){
				clearInterval(timer);
			}
			timer = setInterval(function(){
				for(var i = 0, l =vArr.length; i < l; i++){
					var v = vArr[i];
					if(index == i ){
						if(v.z > 50){
							v.z+= (50-v.z)*0.2;
						}else{
							clearInterval(timer);
							timer = null;
						}
					}else{
						if(v.z < 150){
							v.z += (150-v.z)*0.2;
						}
					}
					
				}
				update();
			}, 1000/60);
		},
		update = function(){
			for(var i = 0, l = vArr.length;i<l; i ++){
				var v = vArr[i],
					img = imgs[i],
					pers = v.getPerspective(300),
					r=v.persProjectNew (pers),
					w = 200 * pers,
					h =  150 * pers;

				img.style.left = r.x-w/2 +"px";
				img.style.top = r.y-h/2 + "px";
				img.style.width = w + "px";
				img.style.height = h + "px";

			}
		},
		addClickEvent = function(el){
			el.addEventListener("click", function(){
				toggleTo(imgs.indexOf(el));
			},false);
		};
		toggleTo(1);
		addClickEvent(img1);
		addClickEvent(img2);
		addClickEvent(img3);
})();
//slide 12
App.register(12, (function(){
	var canvas = new Raphael('slide_10_container', 800, 600);
	var cubicR = 80;
	var running = false;
	var set = [new Vector3d(-cubicR, -cubicR, -cubicR),
				  new Vector3d(cubicR, -cubicR, -cubicR),
				  new Vector3d(cubicR, -cubicR, cubicR),
				  new Vector3d(-cubicR, -cubicR, cubicR),
				  new Vector3d(-cubicR, cubicR, -cubicR),
				  new Vector3d(cubicR, cubicR, -cubicR),
				new Vector3d(cubicR, cubicR, cubicR),
				new Vector3d(-cubicR, cubicR, cubicR)];

	var perFactor;
	var slider = document.getElementById("slide_10_slider");
	var onSliderChanged =function(){
		perFactor = parseFloat(slider.value);
		document.getElementById("slide_10_slider_span").innerHTML = perFactor;
	}
	onSliderChanged();
	slider.onchange = onSliderChanged;
	

	var map2D =function(p){
		var pers = p.getPerspective(perFactor);
		var r=p.persProjectNew (pers);
		r.x+=300;
		r.y+=220;
		return r;
	}
	var drawLine = function(p1, p2){
		canvas.path("M"+p1.x +" "+p1.y+"L"+p2.x+" "+p2.y)
	}

	var animate = function () {
		requestAnimationFrame( animate );
		if(running){
			render();
		}
	}
	var render = function () {
		var i = set.length;
		while (i--) {
			set[i].rotateXY (1, 2);
		}
		var p0 = map2D(set[0]),
		     p1 = map2D(set[1]),
			 p2 = map2D(set[2]),
			 p3 = map2D(set[3]),
			 p4 = map2D(set[4]),
			 p5 = map2D(set[5]),
			 p6 = map2D(set[6]),
			 p7 = map2D(set[7]);
		
		canvas.clear();

		drawLine(p0, p1);
		drawLine(p1, p2);
		drawLine(p2, p3);
		drawLine(p3, p0);
		
		drawLine(p4, p5);
		drawLine(p5, p6);
		drawLine(p6, p7);
		drawLine(p7, p4);
		
		drawLine(p0, p4);
		drawLine(p1, p5);
		drawLine(p2, p6);
		drawLine(p3, p7);
	}
	animate();

	return {
		deactive: function(){
			running = false;
		},
		active: function(){
			running = true;
		}
	}
})());
//slide 13
App.register(13, (function(){
	var camera, scene, renderer, object;
	var w  = 800, h = 520;
	var running = false;
	//³õÊ¼»¯3D³¡¾°
	function init() {
		var container = document.getElementById( 'slide_11_container' );
		camera = new THREE.Camera( 50, w/h, 1, 1000 );
		camera.position.z = 800;
		scene = new THREE.Scene();
		var materials = [];
		for ( var i = 0; i < 6; i ++ ) {
			materials.push( [ new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } ) ] );
		}
		object = new THREE.Mesh( new THREE.Cube(200, 200, 200,  1, 1, 1, materials),  new THREE.MeshFaceMaterial());
		scene.addObject( object );

		var pointLight = new THREE.PointLight( 0xffffff, 1 );
		pointLight.position.x = 300;
		pointLight.position.y = 200;
		scene.addLight( pointLight );

		renderer = new THREE.CanvasRenderer();
		renderer.setSize(w, h );
		container.appendChild( renderer.domElement );
	}
	function animate() {
		requestAnimationFrame( animate );
		if(running){
			render();
		}
	}
	function render() {
		object.rotation.y += 0.01;
		object.rotation.x += 0.02;
		renderer.render(scene, camera );
	}
	init();
	animate();
	return {
		active: function(){
			running = true;
		},
		deactive: function(){
			running = false;
		}
	}
})());

App.register(14, (function(){
			var container, stats;
 
			var camera, scene, renderer;
 
			var mesh;
		
			var mouseX = 0, mouseY = 0;
			var hidePoint = {x: 800, y: -500,z: -200};
			var showed = true;
			var tweens = 0;
			var posCopy = [];
			var w  = 800, h = 520;
			var material;
 
			function init() {
 
				container = document.getElementById( 'slide_12_container' );
 
				camera = new THREE.Camera( 60, w/h, 1, 10000 );
				camera.position.z = 300;
 
				scene = new THREE.Scene();
				material = new THREE.MeshBasicMaterial( {color:0x000000, wireframe: true } );
				mesh = new THREE.Mesh( new THREE.Plane( 400, 300, 10, 10 ),  material);
				scene.addObject(mesh);
 
 
				renderer = new THREE.CanvasRenderer();
				renderer.setSize( w, h );
 
				container.appendChild( renderer.domElement );
 
 
				var vertexs = mesh.geometry.vertices, vertex, i = 0, l = vertexs.length;
				for(; i < l; i++){
					vertex = vertexs[i];
					posCopy[i] = {x : vertex.position.x, y:vertex.position.y, z: vertex.position.z};
				}

				document.addEventListener( 'click', onDocumentMouseClick, false );
 
			}
			function getDelay(i, show){
				var pos = posCopy[i], diffX, diffY, diff;
				if(show){
					diffX = -400 - pos.x;
					diffY =  -200 - pos.y;
					diff =  - diffX + diffY;
				}else{
					diffX = 400 - pos.x;
					diffY =  200 - pos.y;
					diff =   -diffX + diffY;
				}
				return  Math.abs(diff) * 2;
			}

			function moveVertex(v, posX, posY, posZ, i, show){
				
				var position = v.position;
				var px = position.x - posX,
					py = position.y - posY,
					dis = px*px + py*py, delay = getDelay(i, show);

				tweens++;
				new TWEEN.Tween(v.position).delay(delay).easing(
							TWEEN.Easing.Back.EaseInOut).to({
								x:posX,
								y:posY,
								z:posZ
							}, 2000).start().onComplete(function(){
					tweens--;
					if(tweens == 0){
						showed = !showed;
					}
				});
			}
			function onDocumentMouseClick( event ) {
				if(!running){
					return;
				}
				if(tweens > 0 ){
					return;
				}
	
				var vertexs = mesh.geometry.vertices, 
					vertex, 
					i = 0, 
					l = vertexs.length;
				
				if(showed){
					for(; i < l; i++){
						vertex = vertexs[i];
						moveVertex(vertex, hidePoint.x, hidePoint.y, hidePoint.z, i, false);
					}
				}else{
					for(; i < l; i++){
						vertex = vertexs[i];
						moveVertex(vertex, posCopy[i].x, posCopy[i].y, posCopy[i].z, i, true);
					}
				}
 
			}
		var running = false;
		function animate() {
			requestAnimationFrame( animate );
			if(running){
				TWEEN.update();
				renderer.render( scene, camera );
			}
		}
		init();
		animate()
		return {
			active: function(){
				running = true;
			},
			deactive: function(){
				running = false;
			}
		}
 })());	 

App.register(15,  (function(){
			var container, stats;
 
			var camera, scene, renderer;
 
			var mesh;
		
			var mouseX = 0, mouseY = 0;
			var hidePoint = {x: 800, y: -500,z: -200};
			var showed = true;
			var tweens = 0;
			var posCopy = [];
			var w  = 800, h = 520;
			var material;
 
			function init() {
 
				container = document.getElementById( 'slide_13_container' );
 
				camera = new THREE.Camera( 60, w/h, 1, 10000 );
				camera.position.z = 300;
 
				scene = new THREE.Scene();
				material = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'basic-3d/3d.jpg' )} );
				mesh = new THREE.Mesh( new THREE.Plane( 400, 300, 10, 10 ),  material);
				scene.addObject(mesh);
 
 
				renderer = new THREE.CanvasRenderer();
				renderer.setSize( w, h );
 
				container.appendChild( renderer.domElement );
 
 
				var vertexs = mesh.geometry.vertices, vertex, i = 0, l = vertexs.length;
				for(; i < l; i++){
					vertex = vertexs[i];
					posCopy[i] = {x : vertex.position.x, y:vertex.position.y, z: vertex.position.z};
				}

				document.addEventListener( 'click', onDocumentMouseClick, false );
 
			}
			function getDelay(i, show){
				var pos = posCopy[i], diffX, diffY, diff;
				if(show){
					diffX = -400 - pos.x;
					diffY =  -200 - pos.y;
					diff =  - diffX + diffY;
				}else{
					diffX = 400 - pos.x;
					diffY =  200 - pos.y;
					diff =   -diffX + diffY;
				}
				return  Math.abs(diff) * 2;
			}

			function moveVertex(v, posX, posY, posZ, i, show){
				
				var position = v.position;
				var px = position.x - posX,
					py = position.y - posY,
					dis = px*px + py*py, delay = getDelay(i, show);

				tweens++;
				new TWEEN.Tween(v.position).delay(delay).easing(
							TWEEN.Easing.Back.EaseInOut).to({
								x:posX,
								y:posY,
								z:posZ
							}, 2000).start().onComplete(function(){
					tweens--;
					if(tweens == 0){
						showed = !showed;
					}
				});
			}
			function onDocumentMouseClick( event ) {
				if(!running){
					return;
				}
				if(tweens > 0 ){
					return;
				}
	
				var vertexs = mesh.geometry.vertices, 
					vertex, 
					i = 0, 
					l = vertexs.length;
				
				if(showed){
					for(; i < l; i++){
						vertex = vertexs[i];
						moveVertex(vertex, hidePoint.x, hidePoint.y, hidePoint.z, i, false);
					}
				}else{
					for(; i < l; i++){
						vertex = vertexs[i];
						moveVertex(vertex, posCopy[i].x, posCopy[i].y, posCopy[i].z, i, true);
					}
				}
 
			}

			var running = false;
			function animate() {
				requestAnimationFrame( animate );
				if(running){
					TWEEN.update();
					renderer.render( scene, camera );
				}
			}
			init();
			animate()
			return {
				active: function(){
					running = true;
				},
				deactive: function(){
					running = false;
				}
			}
 
 })());