<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
//session_start(); //we need to call PHP's session object to access it through CI
class Boproposals extends CI_Controller 
{
	function __construct()
	{
		parent::__construct();
		//echo "<pre>";print_r($_SESSION);exit;
		//$this->load->model('usersmodel','',TRUE);
		//checklogin();
		$this->RolePermission = getRolePermissions();
	}
 
	function index()
	{
		$result = array();
		$this->load->view('template/header.php');
		$this->load->view('boproposals/index',$result);
		$this->load->view('template/footer.php');
	}
 
	function fetch()
	{
		$_GET['utoken'] = $_SESSION['webpanel']['utoken'];
		$_GET['role_id'] = $_SESSION['webpanel']['role_id'];
		$_GET['user_id'] = $_SESSION['webpanel']['employee_id'];
		//echo "<pre>GET ";print_r($_GET);exit;
		$userListing = curlFunction(SERVICE_URL.'/api/boProposalListing',$_GET);
		$userListing = json_decode($userListing, true);
		//echo "<pre>";print_r($userListing);exit;
		if($userListing['status_code'] == '401'){
			//echo "in condition";
			redirect('login');
			exit();
		}
		
		
		//$get_result = $this->adcategorymodel->getRecords($_GET);

		$result = array();
		$result["sEcho"]= $_GET['sEcho'];

		$result["iTotalRecords"] = $userListing['Data']['totalRecords'];	//iTotalRecords get no of total recors
		$result["iTotalDisplayRecords"]= $userListing['Data']['totalRecords']; //iTotalDisplayRecords for display the no of records in data table.

		$items = array();
		
		if(!empty($userListing['Data']['query_result']) && count($userListing['Data']['query_result']) > 0)
		{
			for($i=0;$i<sizeof($userListing['Data']['query_result']);$i++)
			{
				$temp = array();
				array_push($temp, $userListing['Data']['query_result'][$i]['trace_id'] );
				array_push($temp, $userListing['Data']['query_result'][$i]['plan_name'] );
				array_push($temp, $userListing['Data']['query_result'][$i]['employee_full_name'] );
				array_push($temp, $userListing['Data']['query_result'][$i]['full_name'] );
				array_push($temp, $userListing['Data']['query_result'][$i]['status'] );
				array_push($temp, date("d-m-Y H:i:s", strtotime($userListing['Data']['query_result'][$i]['updated_on'])) );
				
				$actionCol = "";
				if(in_array('ProposalView',$this->RolePermission)){
					$actionCol .='<a href="policyproposal/addedit?text='.rtrim(strtr(base64_encode("id=".$userListing['Data']['query_result'][$i]['proposal_details_id'] ), '+/', '-_'), '=').'" title="Edit">View Proposal</a>';
				}
				
				if($userListing['Data']['query_result'][$i]['status'] == 'BO-Approval-Awaiting'){
					$actionCol .=' | <a href="javascript:void(0);" onclick="acceptProposal(\''.$userListing['Data']['query_result'][$i]['proposal_details_id'] .'\');" title="Accept">Accept</a>';
					
					$actionCol .=' | <a href="javascript:void(0);" onclick="rejectProposal(\''.$userListing['Data']['query_result'][$i]['proposal_details_id'] .'\');" title="Reject">Reject</a>';
					
					$actionCol .=' | <a href="boproposals/addEdit?text='.rtrim(strtr(base64_encode("id=".$userListing['Data']['query_result'][$i]['proposal_details_id'] ), '+/', '-_'), '=').'" title="Edit">Add Discrepancy</a>';
				}	
				
			
				array_push($temp, $actionCol);
				array_push($items, $temp);
			}
		}

		$result["aaData"] = $items;
		echo json_encode($result);
		exit;
	}
	
	function addEdit($id=NULL)
	{
		//print_r($_GET);
		$user_id = "";
		if(!empty($_GET['text']) && isset($_GET['text']))
		{
			$varr=base64_decode(strtr($_GET['text'], '-_', '+/'));	
			parse_str($varr,$url_prams);
			$user_id = $url_prams['id'];
		}
		
		$result = array();
		$result['proposal_details_id'] = $user_id;
		
		$this->load->view('template/header.php');
		$this->load->view('boproposals/addEdit',$result);
		$this->load->view('template/footer.php');
	}
 
	function submitForm()
	{
		// print_r($_POST);
		// exit;
		if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
		{
			
			$data = array();
			$data['utoken'] = $_SESSION['webpanel']['utoken'];
			$data['login_user_id'] = $_SESSION['webpanel']['employee_id'];
			$data['proposal_details_id'] = $_POST['proposal_details_id'];
			$data['discrepancy_type'] = $_POST['discrepancy_type'];
			$data['discrepancy_subtype'] = $_POST['discrepancy_subtype'];
			$data['remark'] = $_POST['remark'];
			
			$addEdit = curlFunction(SERVICE_URL.'/api/addDiscrepancy',$data);
			//echo "<pre>";print_r($addEdit);exit;
			$addEdit = json_decode($addEdit, true);
			
			if($addEdit['status_code'] == '200'){
				echo json_encode(array('success'=>true, 'msg'=>$addEdit['Metadata']['Message']));
				exit;
			}else{
				echo json_encode(array('success'=>false, 'msg'=>$addEdit['Metadata']['Message']));
				exit;
			}
			
		}
		else
		{
			echo json_encode(array('success' => false, 'msg'=>'Problem while updating record.'));
			exit;
		}
	}
 
	//For accept Proposal
	function acceptProposal($id)
	{
		//$appdResult = $this->adcategorymodel->delrecord("tbl_categories","category_id ",$id);
		$username = $_SESSION['webpanel']['employee_fname']." ".$_SESSION['webpanel']['employee_mname']." ".$_SESSION['webpanel']['employee_lname'];
		$data = array();
		$data['id'] = $id;
		$data['utoken'] = $_SESSION['webpanel']['utoken'];
		$data['login_user_id'] = $_SESSION['webpanel']['employee_id'];
		$data['login_user_name'] = $username;
		$delRecord = curlFunction(SERVICE_URL.'/api/acceptProposal',$data);
		//echo "<pre>";print_r($checkDetails);exit;
		$delRecord = json_decode($delRecord, true);
		 
		if($delRecord['status_code'] == '200'){
			echo "1";
		}else{
			echo "2";
		}	
	}
	
	//For reject Proposal
	function rejectProposal($id)
	{
		//$appdResult = $this->adcategorymodel->delrecord("tbl_categories","category_id ",$id);
		$username = $_SESSION['webpanel']['employee_fname']." ".$_SESSION['webpanel']['employee_mname']." ".$_SESSION['webpanel']['employee_lname'];
		$data = array();
		$data['id'] = $id;
		$data['utoken'] = $_SESSION['webpanel']['utoken'];
		$data['login_user_id'] = $_SESSION['webpanel']['employee_id'];
		$data['login_user_name'] = $username;
		$delRecord = curlFunction(SERVICE_URL.'/api/rejectProposal',$data);
		//echo "<pre>";print_r($checkDetails);exit;
		$delRecord = json_decode($delRecord, true);
		 
		if($delRecord['status_code'] == '200'){
			echo "1";
		}else{
			echo "2";
		}	
	}

	
	
	
}

?>