/*---------------------
�����_���[�̏�����
---------------------*/
function create(id, color)
{
    var div = document.getElementById(id)
    var renderer = new THREE.WebGLRenderer({ antialias: true });//�`����s�������_���[�̍쐬(�A���`�G�C���A�X��L����)
    renderer.setSize(300, 300);//�`��̈�̃T�C�Y��ݒ�
    renderer.setClearColor(color, 1);
    //renderer.setClearColorHex(0x333333, 0);//�`��̈�̐F�Ɠ��ߓx��ݒ�(�F��16�i���A���ߓx��0�`1)
    document.getElementById(id).appendChild(renderer.domElement);//�`��̈�̎���

    /*---------------------
    �V�[���̍쐬
    ---------------------*/
    var scene = new THREE.Scene();

    /*---------------------
    �J�����̍쐬
    ---------------------*/
    var camera = new THREE.PerspectiveCamera(15, 500 / 500);//�������e�̃J�������쐬(���s���e��OrthographicCamera)
    camera.position = new THREE.Vector3(0, 0, 8);//�J�����̈ʒu
    camera.lookAt(new THREE.Vector3(0, 0, 0));//�J�����̒����_
    camera.backgroundColor = 0xffffff;
    scene.add(camera);//�V�[���ɃJ������ǉ�

    /*---------------------
    ���C�g�̍쐬
    ---------------------*/
    var light = new THREE.DirectionalLight(0xffffff);//����������(���z���̂悤�Ȍ���)�̃��C�g���쐬
    light.position = new THREE.Vector3(0.577, 0.577, 0.577);//���C�g�̈ʒu
    scene.add(light);//�V�[���Ƀ��C�g��ǉ�

    //var ambient = new THREE.AmbientLight(0x212832);//����(�Ƃ�Ԃ��̂悤�ȊԐړI�Ȃ̌�)���쐬
    //scene.add(ambient);

    /*---------------------
    �\�����镨�̂̍쐬
    ---------------------*/
    var geometry = new THREE.CubeGeometry(1, 1, 1);//�`����쐬
    var material = new THREE.MeshPhongMaterial({//������ݒ�
        color: 0xffffff, //�F�A��
        specular: 0xcccccc, shininess: 50,//�n�C���C�g�̐F�A�n�C���C�g�̑傫���A�����̎�����L��
        //map: THREE.ImageUtils.loadTexture('images/logo_mark.jpg')
    });//�}�b�s���O��ݒ�ibumpMap�ŉ��ʂ̐ݒ肪�\�j

    var mesh = new THREE.Mesh(geometry, material);//���̂��쐬
    scene.add(mesh);//�V�[���ɕ��̂�ǉ�

    /*---------------------
    �����_�����O
    ---------------------*/
    var baseTime = +new Date;
    function render() {
        requestAnimationFrame(render);//�A�j���[�V�������쐬
        mesh.rotation.y = 1 * (+new Date - baseTime) / 1000;//Y���̉�]
        mesh.rotation.x = 0.5 * (+new Date - baseTime) / 1000;//X���̉�]
        renderer.render(scene, camera);//3D�����_�����O�̎��s
    };
    render();

    function tick() {
        var finished = false;

        // �ĕ`��̏���
        // �A�j���[�V�������I��������
        // finished��true�ɂ���

        if (!finished)
            requestAnimationFrame(tick);
    }

    //requestAnimFrame�̃N���X�u���E�U�Ή�
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        function (callback) {
                            window.setTimeout(callback, 1000 / 60);
                        };
    })();
}
